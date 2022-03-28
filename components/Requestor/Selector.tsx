import Image from 'next/image';
import {Dispatch, useContext, useEffect, useState} from 'react';
import {DataStore, Storage} from 'aws-amplify';

import {styles} from '../../styles/components/Requestor.tailwind';
import ethlogo from '../../assets/eth-logo.png';
import {Service} from '../../models';
import {MapContext} from '../../context/map';
import {MapReducerAction} from '../../types';

export interface SelectorProps {
  step: number;
}

const basePrice = 154;

export default function Selector({step}: SelectorProps) {
  const {
    state: {selectedService, estimatedDeliveryDuration},
    dispatch,
  } = useContext(MapContext);
  const [services, setServices] = useState<Service[] | undefined>();

  useEffect(() => {
    (async () => {
      const svcs = await DataStore.query(Service);
      setServices(svcs);
    })();
  }, []);

  if (!services || step === 0) return null;
  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.title}>Select a service</div>
      <div className={styles.serviceList}>
        {services.map((service: Service, index: number) => (
          <OptionItem
            key={`o${index}`}
            {...{service, selected: selectedService, dispatch, estimatedDeliveryDuration}}
          />
        ))}
      </div>
    </div>
  );
}

function OptionItem({
  service,
  selected,
  dispatch,
  estimatedDeliveryDuration,
}: {
  service: Service;
  selected: Service | undefined;
  dispatch: Dispatch<MapReducerAction>;
  estimatedDeliveryDuration: number;
}) {
  const [uri, setURI] = useState<string>('');

  useEffect(() => {
    getServiceImage();
  }, []);

  const getServiceImage = async () => {
    if (!service.image || !service.id) return;

    const savedURI = localStorage.getItem(service.id);
    if (savedURI) {
      console.log('found in storage');
      setURI(savedURI);
      return;
    }

    console.log('storage running');
    await Storage.get(service.image).then(uri => {
      // Save the uri to local storage to be used later, this
      // prevents the need to continually fetch the image from s3
      // which saves $$$!
      localStorage.setItem(service.id, uri);
      setURI(uri);
    });
  };

  const onClick = () => {
    dispatch({type: 'selectService', payload: service});
  };

  const isSelected = selected?.id === service.id;
  const selectedCondition = isSelected && styles.selectedService;

  if (!uri || !service.priceMultiplier) return null;
  return (
    <div className={`${styles.service} ${selectedCondition}`} {...{onClick}}>
      <div className={styles.timeDistance}>5 min away</div>
      <Image src={uri} className={styles.serviceImage} height={80} width={80} />

      <div className={styles.priceContainer}>
        <div className={styles.serviceTitle}>{service.name}</div>

        <div className={styles.price}>
          <div className={styles.ethLogo}>
            {((Math.round(estimatedDeliveryDuration) / 10 ** 5) * service.priceMultiplier).toFixed(5)}
          </div>
          <div className={styles.ethLogo}>
            <Image src={ethlogo} width={14} height={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
