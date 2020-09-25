import { createContext } from 'react';
import { ErrandDeliveryState, ErrandDeliveryDispatch } from './types';

interface  ErrandDeliveryContextProps extends ErrandDeliveryState {
  dispatch: ErrandDeliveryDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const ErrandDeliveryContextInit: ErrandDeliveryContextProps = {
  delivery: undefined,
  errand: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const ErrandDeliveryContext = createContext<ErrandDeliveryContextProps>(ErrandDeliveryContextInit);
