import {useContext, useState} from 'react';
import {MetamaskContext} from '../../context/metamask';
import {styles} from '../../styles/components/Requestor.tailwind';
import Confirm from './Confirm';

import Header from './Header';
import Selector from './Selector';

export default function Requestor() {
  const {currentUser} = useContext(MetamaskContext);
  const [step, setStep] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {!currentUser ? (
          <div className={styles.waitingToConnect}>Connect to request services.</div>
        ) : (
          <>
            <Header />
            <Selector {...{step}} />
            <Confirm {...{step, setStep}} />
          </>
        )}
      </div>
    </div>
  );
}
