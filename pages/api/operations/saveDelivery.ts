import {DataStore} from 'aws-amplify';
import {User, Delivery, Service} from '../../../models';

export const saveDelivery = async (
  pickup: string,
  dropoff: string,
  currentUser: User,
  price: string,
  service: Service
) => {
  if (!pickup || !dropoff || !currentUser) throw new Error('missing proper parameters to save a new Delivery.');

  await DataStore.save(
    new Delivery({
      pickup,
      dropoff,
      customer: {
        name: currentUser.username,
        walletAddress: currentUser.walletAddress,
      },
      price: Number(price),
      service: service.name,
    })
  );
};
