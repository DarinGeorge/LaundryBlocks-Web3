import {MapReducerAction, MapReducerState} from '../../types';

export const mapReducer = (state: MapReducerState, action: MapReducerAction): MapReducerState => {
  switch (action.type) {
    case 'destination': {
      const {pickup, dropoff, type} = action.payload;

      if (type === 'pickup') {
        return {...state, pickup};
      }

      if (type === 'dropoff') {
        return {...state, dropoff};
      }

      return state;
    }

    case 'processCoordinates': {
      switch (action.payload.type) {
        case 'pickup': {
          return {...state, coords: {...state.coords, start: action.payload.data}};
        }

        case 'dropoff': {
          return {...state, coords: {...state.coords, end: action.payload.data}};
        }
      }

      return state;
    }

    case 'selectService': {
      return {...state, selectedService: action.payload};
    }

    case 'deliveryDuration': {
      return {...state, estimatedDeliveryDuration: action.payload};
    }

    default: {
      return state;
    }
  }
};
