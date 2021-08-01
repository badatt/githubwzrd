var AWS = require('aws-sdk');

exports.getSecretValue = async function (secretName) {
  var client = new AWS.SecretsManager({
    region: 'us-east-1',
  });
  const params = {
    SecretId: secretName,
  };
  const secretResponse = await client.getSecretValue(params).promise();
  return JSON.parse(secretResponse.SecretString);
};
