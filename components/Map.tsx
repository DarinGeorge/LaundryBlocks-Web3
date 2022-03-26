import {useContext, useEffect, useState} from 'react';
import MapBox from 'mapbox-gl';

import {styles} from '../styles/components/Map.tailwind';
import {MapContext} from '../context/map';

export default function Map() {
  const [map, setMap] = useState<MapBox.Map>();
  const {
    state: {coords},
    buildMap,
    getRoute,
  } = useContext(MapContext);

  useEffect(() => {
    if (!map) {
      setMap(buildMap());
      return;
    }

    if (!coords) return;
    if (coords.start) placeMarker(map, coords.start);
    if (coords.end) placeMarker(map, coords.end);
    if (coords.start && coords.end) {
      getRoute(coords.start, coords.end, map);
      map.fitBounds([coords.start, coords.end], {padding: 180});
    }
  }, [coords]);

  const placeMarker = (map: MapBox.Map, coordinates: MapBox.LngLatLike) => {
    new MapBox.Marker().setLngLat(coordinates).addTo(map);
  };

  return (
    <div className={styles.container}>
      <div id='map' className={styles.map}></div>
    </div>
  );
}
