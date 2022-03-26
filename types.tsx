import MapBox, {LngLatLike} from 'mapbox-gl';
import {Dispatch} from 'react';

export type RoutingLocation = {
  pickup: string;
  dropoff: string;
};

export type Option = {
  service: 'Dropoff Only' | 'Dropoff & Pickup';
  image: StaticImageData;
  priceMultiplier: number;
};

export type MapProviderValue = {
  state: MapReducerState;
  dispatch: Dispatch<MapReducerAction>;
  buildMap(): MapBox.Map | undefined;
  getRoute(start: Coordinate, end: Coordinate, map: MapBox.Map): Promise<void | undefined>;
};

export type MapReducerState = {
  pickup: string;
  dropoff: string;
  map: MapBox.Map | undefined;
  coords: {start: MapBox.LngLatLike | undefined; end: MapBox.LngLatLike | undefined};
};

export type MapReducerAction =
  | {type: 'destination'; payload: {[x: string]: string; type: string}}
  | {type: 'processCoordinates'; payload: {data: MapBox.LngLatLike; type: string | 'pickup' | 'dropoff'}}
  | {type: 'buildMap'; payload: MapBox.Map};

export type Coordinate = LngLatLike;
