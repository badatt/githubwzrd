import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import vars from './vars';

const mapper = new DataMapper({
  client: new DynamoDB({ region: vars.region, endpoint: vars.dbEndpointUrl }),
  tableNamePrefix: 'githubwzrd-',
});

export const db = {
  mapper: mapper,
  tryGetAsync: async <T>(obj: T, keys: {}): Promise<T> => {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const val = await mapper.get(Object.assign(obj, keys));
        resolve(val);
      } catch (error) {
        if (error.name === 'ItemNotFoundException') {
          resolve(null);
        } else if (error.name === 'ExpiredTokenException') {
          reject('ExpiredTokenException');
        } else {
          reject(error);
        }
      }
    });
  },
};
