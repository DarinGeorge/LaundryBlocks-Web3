import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {ChangeEvent, ChangeEventHandler, FocusEvent, FocusEventHandler, useContext, useEffect, useState} from 'react';

import {MapContext} from '../../../context/map';
import {styles} from '../../../styles/components/Requestor.tailwind';
import CircleSVG from './CircleSVG';
import SquareSVG from './SquareSVG';

const token: string | undefined = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;

export default function Header() {
  const [type, setType] = useState<string | 'pickup' | 'dropoff'>('pickup');
  const {
    state: {pickup, dropoff},
    dispatch,
  } = useContext(MapContext);

  const onChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    dispatch({type: 'destination', payload: {[name]: value, type}});
  };

  const onFocus: FocusEventHandler = (e: FocusEvent<HTMLInputElement>) => {
    const conditions: string[] = ['pickup', 'dropoff'];

    if (!conditions.includes(e.target.name)) return;
    setType(e.target.name);
  };

  const text: string = type === 'pickup' ? 'Where can we pickup your laundry?' : 'Where would you like us to go?';
  const focusedPickupStyles = type === 'pickup' ? styles.itemFocused : '';
  const focusedDropoffStyles = type === 'dropoff' ? styles.itemFocused : '';

  return (
    <>
      <div className={styles.header}>{text}</div>

      {/** Pick up Input */}
      <div className={styles.itemContainer}>
        <div className={`${styles.item} ${focusedPickupStyles}`}>
          <CircleSVG />
          <input
            id='pickup-geocoder'
            type='text'
            className={styles.input}
            name='pickup'
            value={pickup}
            {...{onChange, onFocus}}
          />
        </div>

        <div className={styles.verticalLine} />

        {/** Drop off Input */}
        <div className={`${styles.item} ${focusedDropoffStyles}`}>
          <SquareSVG />
          <input
            id='dropoff-geocoder'
            type='text'
            className={styles.input}
            placeholder='Dropoff?'
            name='dropoff'
            value={dropoff}
            {...{onChange, onFocus}}
          />
        </div>
      </div>
    </>
  );
}
