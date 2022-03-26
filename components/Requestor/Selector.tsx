import {styles} from '../../styles/components/Requestor.tailwind';

import dropoffLaundry from '../../assets/dropoff-laundry.png';
import pickupLaundry from '../../assets/pickup-laundry.png';
import ethlogo from '../../assets/eth-logo.png';
import Image from 'next/image';
import {Option} from '../../types';

const optionList: Option[] = [
  {
    service: 'Dropoff Only',
    image: dropoffLaundry,
    priceMultiplier: 1,
  },
  {
    service: 'Dropoff & Pickup',
    image: pickupLaundry,
    priceMultiplier: 1.5,
  },
];

const basePrice = 154;

export default function Selector() {
  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.title}>Choose a service</div>
      <div className={styles.optionList}>
        {optionList.map((option, index) => (
          <OptionItem key={`o${index}`} {...{option}} />
        ))}
      </div>
    </div>
  );
}

function OptionItem({option}: {option: Option}) {
  return (
    <div className={styles.option}>
      <div className={styles.timeDistance}>5 min away</div>
      <Image src={option.image} className={styles.optionImage} height={80} width={80} />

      <div className={styles.priceContainer}>
        <div className={styles.optionTitle}>{option.service}</div>

        <div className={styles.price}>
          <div className={styles.ethLogo}>{((basePrice / 10 ** 5) * option.priceMultiplier).toFixed(5)}</div>
          <div className={styles.ethLogo}>
            <Image src={ethlogo} width={14} height={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
