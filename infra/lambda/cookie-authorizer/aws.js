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

exports.putItemInTable = async function (tableName, item) {
  var client = new AWS.DynamoDB({
    region: 'us-east-1',
  });
  const params = {
    Item: item,
    TableName: tableName,
  };
  await client.putItem(params).promise();
};
