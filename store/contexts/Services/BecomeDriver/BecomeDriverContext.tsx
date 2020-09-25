import { createContext } from 'react';
import { BecomeDriverState, BecomeDriverDispatch } from './types';

interface  BecomeDriverContextProps extends BecomeDriverState {
  dispatch: BecomeDriverDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const BecomeDriverContextInit: BecomeDriverContextProps = {
  driverInfo: undefined,
  licenseInfo: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const BecomeDriverContext = createContext<BecomeDriverContextProps>(BecomeDriverContextInit);
