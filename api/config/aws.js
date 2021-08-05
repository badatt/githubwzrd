const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');

exports.getSecretValue = async function (secretName) {
  const client = new SecretsManagerClient({ region: 'us-east-1' });
  const params = {
    SecretId: secretName,
  };
  const command = new GetSecretValueCommand(params);
  try {
    const data = await client.send(command);
    return JSON.parse(data.SecretString);
  } catch (error) {
    return error;
  }
};

exports.getUserItem = async function (tableName, userId, org) {
  const client = new DynamoDBClient({ region: 'us-east-1' });
  const params = {
    Key: {
      Id: {
        S: userId,
      },
      Org: {
        S: org,
      },
    },
    TableName: tableName,
  };
  const command = new GetItemCommand(params);
  try {
    const data = await client.send(command);
    return data.Item;
  } catch (error) {
    return error;
  }
};
