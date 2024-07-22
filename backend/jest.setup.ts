import { ASTNode, graphql, GraphQLSchema, print } from 'graphql';
import { Maybe } from 'type-graphql';
import dotenv from 'dotenv';
import { db } from './src/db';
import getSchema from './src/schema';

dotenv.config();

async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(', ');

  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

// eslint-disable-next-line import/no-mutable-exports
export let schema: GraphQLSchema;

export async function execute(
  operation: ASTNode,
  variableValues?: Maybe<{
    readonly [variable: string]: unknown;
  }>,
  authToken?: string,
) {
  const contextValue = authToken
    ? { req: { headers: { authorization: `Bearer ${authToken}` } } }
    : {};
  return graphql({
    schema,
    source: print(operation),
    variableValues,
    contextValue,
  });
}
beforeAll(async () => {
  await db.initialize();
  schema = await getSchema();
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await db.destroy();
});
