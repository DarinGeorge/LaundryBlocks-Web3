import {ethers} from 'ethers';
import MapBox, {LngLatLike} from 'mapbox-gl';
import {Dispatch} from 'react';
import {Service, User} from './models';

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
  buildMap(): MapBox.Map | void;
  getRoute(start: Coordinate, end: Coordinate, map: MapBox.Map): Promise<void>;
  processCoordinates(): void;
};

export type MetamaskProviderValue = {
  metamask: ethers.providers.Web3Provider | undefined;
  connectWallet(): Promise<void>;
  currentUser: User | undefined;
};

export type MapReducerState = {
  pickup: string;
  dropoff: string;
  selectedService: Service | undefined;
  estimatedDeliveryDuration: number;
  coords: {start: MapBox.LngLatLike | undefined; end: MapBox.LngLatLike | undefined};
};

export type MapReducerAction =
  | {type: 'destination'; payload: {[x: string]: string; type: string}}
  | {type: 'processCoordinates'; payload: {data: MapBox.LngLatLike; type: string | 'pickup' | 'dropoff'}}
  | {type: 'buildMap'; payload: MapBox.Map}
  | {type: 'selectService'; payload: Service}
  | {type: 'deliveryDuration'; payload: number};

export type Coordinate = LngLatLike;
