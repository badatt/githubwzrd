const cookie = require('cookie');
const qs = require('querystring');

function cf(event) {
  const record = event.Records[0];
  const cfObj = record.cf;
  const request = cfObj.request;
  const headers = request.headers;

  const cookies = 'cookie' in headers && cookie.parse(headers['cookie'][0].value);

  return {
    request: request,
    host: headers.host[0].value,
    uri: request.uri,
    method: request.method,
    qp: qs.parse(request.querystring),
    cookies: cookies,
    isTokenExist: 'cookie' in headers && 'Token' in cookies,
    token: cookies.Token,
  };
}

exports.cf = cf;
