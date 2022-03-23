import MapBox from 'mapbox-gl';
import {Context, createContext, Provider, ProviderProps, useEffect, useReducer} from 'react';
import {MapProviderValue, MapReducerState} from '../../types';
import {mapReducer} from './reducer';

const mapInitialState: MapReducerState = {
  pickup: '',
  dropoff: '',
  coords: {start: undefined, end: undefined},
};

const mapInitialValue: MapProviderValue = {
  state: mapInitialState,
  dispatch: () => {
    throw new Error('Unrecognized component attempted to access MapContext');
  },
  buildMap: () => undefined,
};

const endpoint = process.env.NEXT_PUBLIC_MAPBOX_PLACES_API_URL;
const token = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;

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

  const processCoordinates = async () => {
    await Promise.all([
      createCoordinate({name: pickup, type: 'pickup'}),
      createCoordinate({name: dropoff, type: 'dropoff'}),
    ]);
  };

  const createCoordinate = (info: {name: string; type: 'pickup' | 'dropoff'}) => {
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
    // connectWallet
    // currentAccount
    // currentUser
    // metamask
  };

  return <MapContext.Provider {...{value}}>{children}</MapContext.Provider>;
}
