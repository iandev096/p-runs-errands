import { createContext } from 'react';
import { HireDriverState, HireDriverDispatch } from './types';

interface  HireDriverContextProps extends HireDriverState {
  dispatch: HireDriverDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const HireDriverContextInit: HireDriverContextProps = {
  drivers: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const HireDriverContext = createContext<HireDriverContextProps>(HireDriverContextInit);
