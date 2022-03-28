import {ethers} from 'ethers';
import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {MapContext} from '../../context/map';
import {MetamaskContext} from '../../context/metamask';
import {saveDelivery} from '../../pages/api/operations/saveDelivery';
import {styles} from '../../styles/components/Requestor.tailwind';

export interface ConfirmButtonProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const masterAddress = process.env.NEXT_PUBLIC_MASTER_WALLET_ADDRESS;

export default function Confirm({step, setStep}: ConfirmButtonProps) {
  const {
    state: {pickup, dropoff, estimatedDeliveryDuration, selectedService},
    processCoordinates,
  } = useContext(MapContext);
  const {currentUser, metamask} = useContext(MetamaskContext);

  const saveDeliveryDetails = async () => {
    if (step === 0) {
      processCoordinates();
      setStep((current: number) => current + 1);
    }

    if (step === 1) {
      if (pickup.trim() === '' || dropoff.trim() === '' || !currentUser || !selectedService?.priceMultiplier) return;
      const price = ((Math.round(estimatedDeliveryDuration) / 10 ** 5) * selectedService.priceMultiplier).toFixed(5);

      await metamask?.send('eth_sendTransaction', [
        {
          from: currentUser.walletAddress,
          to: masterAddress,
          gas: '0x7EF40', // 520000 Gwei,
          value: ethers.utils.parseEther(price)._hex,
        },
      ]);
      await saveDelivery(pickup, dropoff, currentUser, price, selectedService);
    }
  };

  const disableCondition =
    (pickup.trim() === '' || dropoff.trim() === '' || !currentUser) && styles.disabledConfirmButton;

  return (
    <div className={styles.confirmWrapper}>
      <div className={styles.confirmContainer}>
        <div className={styles.confirmButtonContainer}>
          <div className={`${styles.confirmButton} ${disableCondition}`} onClick={saveDeliveryDetails}>
            {step === 0 ? 'Next' : 'Request'}
          </div>
        </div>
      </div>
    </div>
  );
}
