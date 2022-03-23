import React from 'react';
import {styles} from '../../styles/components/Requestor.tailwind';

export default function Confirm() {
  const saveDetails = async () => {};

  return (
    <div className={styles.confirmWrapper}>
      <div className={styles.confirmContainer}>
        <div className={styles.confirmButtonContainer}>
          <div className={styles.confirmButton} onClick={saveDetails}>
            Confirm Request
          </div>
        </div>
      </div>
    </div>
  );
}
