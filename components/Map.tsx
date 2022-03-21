import MapBox from 'mapbox-gl';
import {styles} from '../styles/components/Map.tailwind';
import {useEffect} from 'react';

MapBox.accessToken = process.env.NEXT_PUBLIC_LB_MAP_LOCAL_ACCESS_TOKEN;

export default function Map() {
  useEffect(() => {
    new MapBox.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.29011, 39.39172],
      zoom: 3,
    });
  }, []);

  return <div id='map' className={styles.wrapper}></div>;
}
