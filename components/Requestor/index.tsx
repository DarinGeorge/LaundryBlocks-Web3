import {styles} from '../../styles/components/Requestor.tailwind';
import Confirm from './Confirm';

import Header from './Header';
import Selector from './Selector';

export default function Requestor() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Header />
        <Selector />
        <Confirm />
      </div>
    </div>
  );
}
