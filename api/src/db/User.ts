import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('user')
export default class User {
  @hashKey({ attributeName: 'Id', attributeType: 'S' })
  id: string;

  @rangeKey({ attributeName: 'Org', attributeType: 'S' })
  org: string;

  @attribute()
  repos?: string[];
}
