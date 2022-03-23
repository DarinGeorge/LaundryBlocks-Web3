import Image from 'next/image';
import {styles} from '../styles/components/Navbar.tailwind';

const userImageSize = 40;
const src = 'https://randomuser.me/api/portraits/med/men/75.jpg';

const connectedAccount = '0x3316E01aBcA2c15FD38c4945a53066F58161C079';

export default function Navbar() {
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
        {!connectedAccount ? (
          <div className={styles.connectBtn}>
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
              <div className={styles.username}>Username</div>
              <div className={styles.walletAddress}>
                {connectedAccount.slice(0, 2)}***{connectedAccount.slice(38)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
