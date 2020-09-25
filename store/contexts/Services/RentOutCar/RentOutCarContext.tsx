import { createContext } from 'react';
import { RentOutCarState, RentOutCarDispatch } from './types';

interface  RentOutCarContextProps extends RentOutCarState {
  dispatch: RentOutCarDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const RentOutCarContextInit: RentOutCarContextProps = {
  vehicleDetails: undefined,
  driverOptions: undefined,
  additionalInfo: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const RentOutCarContext = createContext<RentOutCarContextProps>(RentOutCarContextInit);
