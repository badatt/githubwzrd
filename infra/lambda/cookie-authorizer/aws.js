var AWS = require('aws-sdk');

exports.getSecretValue = async function (secretName) {
  var client = new AWS.SecretsManager();
  const secretResponse = await client.getSecretValue({
    SecretId: secretName,
  });
  return JSON.parse(secretResponse.data.SecretString);
};
