import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Customer {
  readonly name?: string;
  readonly walletAddress?: string;
  constructor(init: ModelInit<Customer>);
}

type DeliveryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Delivery {
  readonly id: string;
  readonly pickup?: string;
  readonly dropoff?: string;
  readonly customer?: Customer;
  readonly price?: number;
  readonly service?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Delivery, DeliveryMetaData>);
  static copyOf(source: Delivery, mutator: (draft: MutableModel<Delivery, DeliveryMetaData>) => MutableModel<Delivery, DeliveryMetaData> | void): Delivery;
}

export declare class Service {
  readonly id: string;
  readonly name?: string;
  readonly image?: string;
  readonly priceMultiplier?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Service, ServiceMetaData>);
  static copyOf(source: Service, mutator: (draft: MutableModel<Service, ServiceMetaData>) => MutableModel<Service, ServiceMetaData> | void): Service;
}

export declare class User {
  readonly id: string;
  readonly walletAddress: string;
  readonly username: string;
  readonly image?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}