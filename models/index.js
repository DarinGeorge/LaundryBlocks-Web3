// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Delivery, Service, User, Customer } = initSchema(schema);

export {
  Delivery,
  Service,
  User,
  Customer
};