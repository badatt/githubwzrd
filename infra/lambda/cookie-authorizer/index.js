const qs = require('querystring');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');
const uuid = require('uuid');
const { privateEncrypt } = require('crypto');
const auth = require('./auth.js');
const { cf } = require('./request');
const { unauthorized, internalServerError, redirect } = require('./response.js');
const { getSecretValue } = require('./aws.js');
const { authConfig } = require('./config.js');

var config;

exports.handler = async (event, context, callback) => {
  if (typeof config == 'undefined') {
    const oauthCreds = await getSecretValue('GithubwzrdOauthAppCreds');
    const cryptoKeys = await getSecretValue('GithubwzrdCookieAuthorizerCrypto');
    config = {
      AUTH_REQUEST: {
        client_id: oauthCreds.CLIENT_ID,
        redirect_uri: authConfig.redirect_uri,
        scope: authConfig.scopes,
      },
      TOKEN_REQUEST: {
        client_id: oauthCreds.CLIENT_ID,
        client_secret: oauthCreds.CLIENT_SECRET,
        redirect_uri: authConfig.redirect_uri,
      },
      PRIVATE_KEY: Buffer.from(cryptoKeys.PRIVATE_KEY, 'base64').toString('utf-8'),
      PUBLIC_KEY: Buffer.from(cryptoKeys.PUBLIC_KEY, 'base64').toString('utf-8'),
      SESSION_DURATION: authConfig.session_duration,
      CALLBACK_PATH: authConfig.callback_path,
      ORGANIZATION: authConfig.organisation,
      AUTHORIZATION_ENDPOINT: 'https://github.com/login/oauth/authorize',
      TOKEN_ENDPOINT: 'https://github.com/login/oauth/access_token',
    };
  }
  await mainProcess(event, callback);
};

async function mainProcess(event, callback) {
  const req = cf(event);

  if (req.uri.startsWith(config.CALLBACK_PATH)) {
    await handleLoginCallback(req, callback);
  } else if (req.uri.startsWith('/logout')) {
    // TODO revisit this later
    redirectTo('/', callback);
  } else if (req.isTokenExist) {
    jwt.verify(req.token, config.PUBLIC_KEY.trim(), { algorithms: ['RS256'] }, function (err, decoded) {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            redirectTo(req.uri, callback);
            break;
          case 'JsonWebTokenError':
            unauthorized(err.message, callback);
            break;
          default:
            unauthorized('Unauthorized. User ' + decoded.sub + ' is not permitted.', callback);
        }
      } else {
        auth.isAuthorized(decoded, req.request, callback, unauthorized, internalServerError, config);
      }
    });
  } else {
    redirectTo(req.uri, callback);
  }
}

async function handleLoginCallback({ qp, host }, callback) {
  /** Verify code is in querystring */
  if (!qp.code || !qp.state) {
    unauthorized('No code or state found.', callback);
  }
  config.TOKEN_REQUEST.code = qp.code;
  config.TOKEN_REQUEST.state = qp.state;
  /** Exchange code for authorization token */
  const postData = qs.stringify(config.TOKEN_REQUEST);
  const tokenResponse = await axios.post(config.TOKEN_ENDPOINT, postData);
  if (tokenResponse.error) {
    internalServerError(`Error getting token: ${tokenResponse}`, callback);
  }
  var tokenResponseQs = qs.parse(tokenResponse.data);
  if (tokenResponseQs.error) {
    internalServerError(`Error while getting token: ${tokenResponseQs.error_description}`, callback);
  }
  const authorization = tokenResponseQs.token_type + ' ' + tokenResponseQs.access_token;

  const userResponse = await axios.get('https://api.github.com/user', { headers: { Authorization: authorization } });

  if (userResponse.error) {
    internalServerError(`Error getting user: ${userResponse}`, callback);
  }

  // Check if authenticated user's login is a member of given org

  if (!userResponse.data.hasOwnProperty('login')) {
    internalServerError('Unable to find login', callback);
  }
  var username = userResponse.data.login;
  var orgsGet = 'https://api.github.com/orgs/' + config.ORGANIZATION + '/members/' + username;

  const orgsResponse = await axios.get(orgsGet, { headers: { Authorization: authorization } });

  if (orgsResponse.error) {
    internalServerError(`Error checking membership: ${orgsResponse}`, callback);
  }

  // Set cookie upon verified membership
  if (orgsResponse.status == 204) {
    const payload = {
      org: config.ORGANIZATION,
      userId: userResponse.data.id,
      gitToken: tokenResponseQs.access_token,
    };

    const encryptedPayload = privateEncrypt(config.PRIVATE_KEY.trim(), Buffer.from(JSON.stringify(payload)));

    const signedCookie = cookie.serialize(
      'Token',
      jwt.sign(
        {
          payload: encryptedPayload.toString('base64'),
        },
        config.PRIVATE_KEY.trim(),
        {
          audience: host,
          subject: auth.getSubject(username),
          expiresIn: config.SESSION_DURATION,
          algorithm: 'RS256',
        }, // Options
      ),
    );
    redirect('/', [signedCookie], callback);
  } else {
    unauthorized(
      'Unauthorized! User ' + orgsResponse.data.login + ' is not a member of required organization',
      callback,
    );
  }
}

function redirectTo(uri, callback) {
  config.AUTH_REQUEST.state = uuid.v4();
  // Redirect to Authorization Server
  var querystring = qs.stringify(config.AUTH_REQUEST);
  redirect(
    config.AUTHORIZATION_ENDPOINT + '?' + querystring,
    [cookie.serialize('Token', '', { path: '/', expires: new Date(1970, 1, 1, 0, 0, 0, 0) })],
    callback,
  );
}
