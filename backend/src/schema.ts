import { buildSchema } from 'type-graphql';
import BookResolver from './resolvers/bookResolver';
import UserResolver from './resolvers/user/user-resolver';
import customAuthChecker from './lib/auth-checker';
import ActivityEntryResolver from './resolvers/activity-entry/activity-entry-resolvers';

async function getSchema() {
  return buildSchema({
    resolvers: [BookResolver, UserResolver, ActivityEntryResolver],
    validate: false,
    authChecker: customAuthChecker,
  });
}

export default getSchema;
