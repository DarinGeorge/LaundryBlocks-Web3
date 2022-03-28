import {BigNumber, ethers} from 'ethers';
import Image from 'next/image';
import {useContext, useEffect, useState} from 'react';

import {MetamaskContext} from '../context/metamask';
import {styles} from '../styles/components/Navbar.tailwind';

const userImageSize = 40;
const src = 'https://randomuser.me/api/portraits/med/men/75.jpg';

export default function Navbar() {
  const [balance, setBalance] = useState<number>();
  const {currentUser, connectWallet, metamask} = useContext(MetamaskContext);

  const onClickConnectButton = async () => {
    await connectWallet();
  };

  useEffect(() => {
    if (!currentUser || !metamask) return;

    (async () => {
      const bal = await metamask.getBalance(currentUser.walletAddress);
      const fullBal = ethers.utils.formatEther(bal);
      const formattedBal = parseFloat(fullBal).toFixed(3);

      setBalance(Number(formattedBal));
    })();
  }, [currentUser, metamask]);

  return (
    <div className={styles.container}>
      {/** Left List */}
      <div className={styles.left}>
        <div className={styles.logo}>LaundryBlocks</div>
        <div className={styles.listItem}>Request</div>
        <div className={styles.listItem}>Deliver</div>
        <div className={styles.listItem}>Support</div>
      </div>

      {/** Right List */}
      <div className={styles.right}>
        {!currentUser ? (
          <div className={styles.connectBtn} onClick={onClickConnectButton}>
            <span className={styles.connectBtnText}>Connect</span>
          </div>
        ) : (
          <>
            <div className={styles.avatar}>
              <Image
                {...{src}}
                className={styles.avatarImage}
                width={userImageSize}
                height={userImageSize}
                alt='Your current avatar'
              />
            </div>

            <div className={styles.userInfo}>
              <div className={styles.username}>{currentUser.username}</div>
              <div className={styles.walletAddress}>
                {currentUser.walletAddress?.slice(0, 2)}****{currentUser.walletAddress?.slice(38)}
              </div>
            </div>

            <div>{balance} ETH</div>
          </>
        )}
      </div>
    </div>
  );
}
