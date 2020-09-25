import { createContext } from 'react';
import { RentCarState, RentCarDispatch } from './types';

interface  RentCarContextProps extends RentCarState {
  dispatch: RentCarDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const RentCarContextInit: RentCarContextProps = {
  cars: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const RentCarContext = createContext<RentCarContextProps>(RentCarContextInit);
