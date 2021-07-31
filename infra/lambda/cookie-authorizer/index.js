const qs = require('querystring');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const jwkToPem = require('jwk-to-pem');
const auth = require('./auth.js');
const { cf } = require('./request');
const { unauthorized, internalServerError, redirect } = require('./response.js');
const axios = require('axios');
var config;

exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));
  if (typeof config == 'undefined') {
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  }
  await mainProcess(event, callback);
};

async function mainProcess(event, callback) {
  const req = cf(event);

  if (req.uri.startsWith(config.CALLBACK_PATH)) {
    await handleLoginCallback(req, callback);
  } else if (req.isTokenExist) {
    // Verify the JWT, the payload email, and that the email ends with configured hosted domain
    jwt.verify(req.token, config.PUBLIC_KEY.trim(), { algorithms: ['RS256'] }, function (err, decoded) {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            console.log('Token expired, redirecting to OIDC provider.');
            redirectTo(req.uri, callback);
            break;
          case 'JsonWebTokenError':
            console.log('JWT error, unauthorized.');
            unauthorized(err.message, callback);
            break;
          default:
            console.log('Unknown JWT error, unauthorized.');
            unauthorized('Unauthorized. User ' + decoded.sub + ' is not permitted.', callback);
        }
      } else {
        console.log('Authorizing user.');
        auth.isAuthorized(decoded, req.request, callback, unauthorized, internalServerError, config);
      }
    });
  } else {
    console.log('Redirecting to GitHub.');
    redirectTo(req.uri, callback);
  }
}

async function handleLoginCallback({ qp, host }, callback) {
  console.log('Callback from GitHub received');
  /** Verify code is in querystring */
  if (!qp.code || !qp.state) {
    unauthorized('No code or state found.', callback);
  }
  config.TOKEN_REQUEST.code = qp.code;
  config.TOKEN_REQUEST.state = qp.state;
  /** Exchange code for authorization token */
  const postData = qs.stringify(config.TOKEN_REQUEST);
  console.log('Requesting access token.');
  const tokenResponse = await axios.post(config.TOKEN_ENDPOINT, postData);
  console.log(`Token resonse: ${tokenResponse.data}`);
  if (tokenResponse.error) {
    internalServerError(`Error getting token: ${tokenResponse}`, callback);
  }
  var responseQueryString = qs.parse(tokenResponse.data);
  if (responseQueryString.error) {
    internalServerError(`Error while getting token: ${responseQueryString.error_description}`, callback);
  }
  const authorization = responseQueryString.token_type + ' ' + responseQueryString.access_token;

  const userResponse = await axios.get('https://api.github.com/user', { headers: { Authorization: authorization } });

  if (userResponse.error) {
    internalServerError(`Error getting user: ${userResponse}`, callback);
  }

  console.log(`User resonse: ${JSON.stringify(userResponse.data)}`);
  // Check if authenticated user's login is a member of given org

  if (!userResponse.data.hasOwnProperty('login')) {
    internalServerError('Unable to find login', callback);
  }
  var username = userResponse.data.login;
  var orgsGet = 'https://api.github.com/orgs/' + config.ORGANIZATION + '/members/' + username;
  console.log('Checking ORG membership.');

  const orgsResponse = await axios.get(orgsGet, { headers: { Authorization: authorization } });

  if (orgsResponse.error) {
    internalServerError(`Error checking membership: ${orgsResponse}`, callback);
  }

  console.log(`Org response: ${JSON.stringify(orgsResponse.data)}`);
  // Set cookie upon verified membership
  if (orgsResponse.status == 204) {
    console.log('Setting cookie and redirecting.');

    const signedCookie = cookie.serialize(
      'TOKEN',
      jwt.sign(
        {
          org: config.ORGANIZATION,
          userId: userResponse.data.id,
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
    redirect(qp.state, [signedCookie], callback);
  } else {
    console.log('User not a member of required ORG. Unauthorized.');
    unauthorized(
      'Unauthorized. User ' + orgsResponse.data.login + ' is not a member of required organization.',
      callback,
    );
  }
}

function redirectTo(uri, callback) {
  config.AUTH_REQUEST.state = uri;
  // Redirect to Authorization Server
  var querystring = qs.stringify(config.AUTH_REQUEST);
  redirect(
    config.AUTHORIZATION_ENDPOINT + '?' + querystring,
    [cookie.serialize('TOKEN', '', { path: '/', expires: new Date(1970, 1, 1, 0, 0, 0, 0) })],
    callback,
  );
}
