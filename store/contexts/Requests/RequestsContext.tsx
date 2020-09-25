import { createContext } from 'react';
import { RequestsState, RequestsDispatch } from './types';

interface  RequestsContextProps extends RequestsState {
  dispatch: RequestsDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const RequestsContextInit: RequestsContextProps = {
  hireDrivers: undefined,
  rentCars: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const RequestsContext = createContext<RequestsContextProps>(RequestsContextInit);
