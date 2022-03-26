import MapBox from 'mapbox-gl';
import {Context, createContext, useEffect, useReducer} from 'react';
import {Coordinate, MapProviderValue, MapReducerState} from '../../types';
import {mapReducer} from './reducer';

const mapInitialState: MapReducerState = {
  pickup: '',
  dropoff: '',
  map: undefined,
  coords: {start: undefined, end: undefined},
};

const mapInitialValue: MapProviderValue = {
  state: mapInitialState,
  dispatch: () => {
    throw new Error('Unrecognized component attempted to access MapContext');
  },
  buildMap: () => undefined,
  getRoute: async () => undefined,
};

const endpoint: string | undefined = process.env.NEXT_PUBLIC_MAPBOX_PLACES_API_URL;
const token: string | undefined = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;

export const MapContext: Context<MapProviderValue> = createContext(mapInitialValue);

export function MapProvider({children}: any) {
  const [state, dispatch] = useReducer(mapReducer, mapInitialState);
  const {pickup, dropoff} = state;

  useEffect(() => {
    if (pickup.trim() === '' || dropoff.trim() === '') return;

    processCoordinates();
  }, [pickup, dropoff]);

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

  const getRoute = async (start: [number, number], end: [number, number], map: MapBox.Map) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${token}`,
      {method: 'GET'}
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it
    if (map.getSource('route')) {
      // handle resetting data
    }
    // otherwise, we'll make a new request
    else {
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
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      });
    }
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
        const res = await fetch(`${endpoint}/${info.name}.json?access_token=${token}`, {
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
    // connectWallet
    // currentAccount
    // currentUser
    // metamask
  };

  return <MapContext.Provider {...{value}}>{children}</MapContext.Provider>;
}
