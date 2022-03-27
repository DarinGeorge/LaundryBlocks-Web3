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
  }, [service]);

  const getServiceImage = async () => {
    if (!service.image) return;

    const _uri = await Storage.get(service.image);
    setURI(_uri);
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
