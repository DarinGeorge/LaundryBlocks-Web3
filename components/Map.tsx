import {useContext, useEffect, useState} from 'react';
import MapBox from 'mapbox-gl';

import {styles} from '../styles/components/Map.tailwind';
import {MapContext} from '../context/map';

export default function Map() {
  const [map, setMap] = useState<void | MapBox.Map>();
  const {
    state: {coords},
    buildMap,
    getRoute,
  } = useContext(MapContext);

  useEffect(() => {
    if (!map) {
      const _builtMap = buildMap() as MapBox.Map;
      setMap(_builtMap);
      return;
    }

    if (!coords) return;

    if (coords.start && coords.end) {
      getRoute(coords.start, coords.end, map);
      map.fitBounds([coords.start, coords.end], {padding: 200});
    }
  }, [coords]);

  return (
    <div className={styles.container}>
      <div id='map' className={styles.map}></div>
    </div>
  );
}
