// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Service, User } = initSchema(schema);

export {
  Service,
  User
};