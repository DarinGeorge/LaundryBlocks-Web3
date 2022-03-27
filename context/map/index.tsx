import MapBox from 'mapbox-gl';
import {Context, createContext, useEffect, useReducer} from 'react';
import {MapProviderValue, MapReducerState} from '../../types';
import {mapReducer} from './reducer';

const mapInitialState: MapReducerState = {
  pickup: '',
  dropoff: '',
  selectedService: undefined,
  estimatedDeliveryDuration: 0,
  coords: {start: undefined, end: undefined},
};

const mapInitialValue: MapProviderValue = {
  state: mapInitialState,
  dispatch: () => {
    throw new Error('Unrecognized component attempted to access MapContext');
  },
  buildMap: () => {},
  getRoute: async () => {},
  processCoordinates: () => {},
};

const coordinateEndpoint: string | undefined = process.env.NEXT_PUBLIC_MAPBOX_PLACES_API_URL;
const routingEndpoint: string | undefined = process.env.NEXT_PUBLIC_MAPBOX_ROUTING_DRIVING_API_URL;
const token: string | undefined = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;

export const MapContext: Context<MapProviderValue> = createContext(mapInitialValue);

export function MapProvider({children}: any) {
  const [state, dispatch] = useReducer(mapReducer, mapInitialState);
  const {pickup, dropoff} = state;

  let markers: MapBox.Marker[] = [];

  const buildMap = () => {
    const map = new MapBox.Map({
      container: 'map',
      accessToken: token,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.82137, 40.86505],
      zoom: 14.5,
    });

    return map;
  };

  const placeMarker = (map: MapBox.Map, coordinates: MapBox.LngLatLike) => {
    markers.push(
      new MapBox.Marker({
        color: '#000',
      })
        .setLngLat(coordinates)
        .addTo(map)
    );
  };

  const clearMarkers = () => {
    markers.forEach(marker => marker.remove());
  };

  const getRoute = async (start: [number, number], end: [number, number], map: MapBox.Map) => {
    const query = await fetch(
      `${routingEndpoint}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${token}`,
      {method: 'GET'}
    );
    const json = await query.json();

    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const duration: number = data.duration;
    const geojson = {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: route,
      },
    };
    clearMarkers();
    placeMarker(map, start);
    placeMarker(map, end);
    // if the route already exists on the map, we'll reset it
    if (map.getSource('route')) {
      // handle resetting data
    } else {
      // otherwise, we'll make a new request
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#000',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      });
    }

    dispatch({type: 'deliveryDuration', payload: duration});
  };

  const processCoordinates = async () => {
    await Promise.all([
      createCoordinate({name: pickup, type: 'pickup'}),
      createCoordinate({name: dropoff, type: 'dropoff'}),
    ]);
  };

  const createCoordinate = (info: {name: string; type: 'pickup' | 'dropoff'}) => {
    if (info.name === undefined || info.type === undefined) return;

    return new Promise(async (resolve: (value: undefined) => void, reject) => {
      try {
        const res = await fetch(`${coordinateEndpoint}/${info.name}.json?access_token=${token}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const locations = await res.json();

        const data: MapBox.LngLatLike = locations.features[0].center;

        if (!!data) {
          dispatch({type: 'processCoordinates', payload: {data, type: info.type}});
          resolve(undefined);
        } else {
          reject();
        }
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  };

  const value: MapProviderValue = {
    state,
    dispatch,
    buildMap,
    getRoute,
    processCoordinates,
  };

  return <MapContext.Provider {...{value}}>{children}</MapContext.Provider>;
}
