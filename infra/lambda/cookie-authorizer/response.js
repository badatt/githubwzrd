const cookie = require('cookie');

function unauthorized(body, callback) {
  const response = {
    status: '401',
    statusDescription: 'Unauthorized',
    body: body,
    headers: {
      'set-cookie': [
        {
          key: 'Set-Cookie',
          value: cookie.serialize('TOKEN', '', { path: '/', expires: new Date(1970, 1, 1, 0, 0, 0, 0) }),
        },
      ],
    },
  };
  callback(null, response);
}

function internalServerError(body, callback) {
  const response = {
    status: '500',
    statusDescription: 'Internal Server Error',
    body: body,
  };
  callback(null, response);
}

function redirect(location, cookies, callback) {
  const headers = {
    location: [
      {
        key: 'Location',
        value: location,
      },
    ],
    'set-cookie': [],
  };

  headers['set-cookie'] = cookies.map((c) => ({ key: 'Set-Cookie', value: c }));

  const response = {
    status: '302',
    statusDescription: 'Found',
    body: 'Redirecting...',
    headers: headers,
  };
  callback(null, response);
}

exports.unauthorized = unauthorized;
exports.internalServerError = internalServerError;
exports.redirect = redirect;
