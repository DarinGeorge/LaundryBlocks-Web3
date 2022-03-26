import Image from 'next/image';
import {useEffect, useState} from 'react';
import {DataStore, Storage} from 'aws-amplify';

import {styles} from '../../styles/components/Requestor.tailwind';
import ethlogo from '../../assets/eth-logo.png';
import {Service} from '../../models';

const basePrice = 154;

export default function Selector() {
  const [services, setServices] = useState<Service[] | undefined>();

  useEffect(() => {
    (async () => {
      const svcs = await DataStore.query(Service);
      setServices(svcs);
    })();
  }, []);

  if (!services) return null;
  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.title}>Choose a service</div>
      <div className={styles.serviceList}>
        {services.map((service: Service, index: number) => (
          <OptionItem key={`o${index}`} {...{service}} />
        ))}
      </div>
    </div>
  );
}

function OptionItem({service}: {service: Service}) {
  const [uri, setURI] = useState<string>('');

  useEffect(() => {
    getServiceImage();
  }, [service]);

  const getServiceImage = async () => {
    if (!service.image) return;

    const _uri = await Storage.get(service.image);
    setURI(_uri);
  };

  if (!uri || !service.priceMultiplier) return null;
  return (
    <div className={styles.service}>
      <div className={styles.timeDistance}>5 min away</div>
      <Image src={uri} className={styles.serviceImage} height={80} width={80} />

      <div className={styles.priceContainer}>
        <div className={styles.serviceTitle}>{service.name}</div>

        <div className={styles.price}>
          <div className={styles.ethLogo}>{((basePrice / 10 ** 5) * service.priceMultiplier).toFixed(5)}</div>
          <div className={styles.ethLogo}>
            <Image src={ethlogo} width={14} height={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
