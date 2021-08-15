import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

export const getSecretValue = async (secretName: string) => {
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

export const getUserItem = async (tableName: string, userId: string, org: string) => {
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
