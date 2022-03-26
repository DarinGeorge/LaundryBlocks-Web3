import {ethers} from 'ethers';
import {Context, createContext, useEffect, useReducer, useState} from 'react';
import {User} from '../../models';
import {saveUser} from '../../pages/api/operations/saveUser';
import {MetamaskProviderValue} from '../../types';

const metamaskInitialValue: MetamaskProviderValue = {
  metamask: undefined,
  connectWallet: async () => {},
  currentUser: undefined,
};

export const MetamaskContext: Context<MetamaskProviderValue> = createContext(metamaskInitialValue);

export function MetamaskProvider({children}: any) {
  const [currentUser, setUser] = useState<User & {isNew: boolean}>();
  const [metamask, setProvider] = useState<ethers.providers.Web3Provider>();

  const connectWallet = async () => {
    if (typeof window === 'undefined')
      throw new Error('Web 3 enabled browser not found or provider not installed/found.');

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);

    if (!metamask) {
      setProvider(provider);
    }

    try {
      const addresses = await provider.send('eth_requestAccounts', []);

      if (addresses.length > 0) {
        const user = await saveUser(addresses[0]);

        if (user) {
          setUser(user);
        }
      }
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const value: MetamaskProviderValue = {
    metamask,
    currentUser,
    connectWallet,
  };

  return <MetamaskContext.Provider {...{value}}>{children}</MetamaskContext.Provider>;
}
