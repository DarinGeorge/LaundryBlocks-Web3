import {DataStore} from 'aws-amplify';
import faker from '@faker-js/faker';
import {User} from '../../../models';

export const saveUser = async (address: string) => {
  if (!address) return;

  const existingUser = (await DataStore.query(User)).find(user => user.walletAddress === address);

  if (existingUser) {
    const user = {...existingUser, isNew: false};
    return user;
  } else {
    const user = await DataStore.save(
      new User({
        username: faker.name.findName('AnonymousUser', ''),
        walletAddress: address,
      })
    );

    const newUser: User & {isNew: boolean} = {...user, isNew: true};
    return newUser;
  }
};
