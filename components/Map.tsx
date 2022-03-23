import {useContext, useEffect, useState} from 'react';
import MapBox from 'mapbox-gl';

import {styles} from '../styles/components/Map.tailwind';
import {MapContext} from '../context/map';

export default function Map() {
  const [map, setMap] = useState<MapBox.Map>();
  const {
    state: {coords},
    buildMap,
  } = useContext(MapContext);

  useEffect(() => {
    if (!map) initMap();

    if (!coords) return;
    if (coords.start && map) placeMarker(map, coords.start);
    if (coords.end && map) placeMarker(map, coords.end);
  }, [coords]);

  const initMap = () => {
    const _map: MapBox.Map | undefined = buildMap();
    setMap(_map);
  };

  const placeMarker = (map: MapBox.Map, coordinates: MapBox.LngLatLike) => {
    new MapBox.Marker().setLngLat(coordinates).addTo(map);
  };

  return (
    <div className={styles.container}>
      <div id='map' className={styles.map}></div>
    </div>
  );
}
