import { createContext } from 'react';
import { CargoGoodsState, CargoGoodsDispatch } from './types';

interface  CargoGoodsContextProps extends CargoGoodsState {
  dispatch: CargoGoodsDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const CargoGoodsContextInit: CargoGoodsContextProps = {
  cargoDetails: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const CargoGoodsContext = createContext<CargoGoodsContextProps>(CargoGoodsContextInit);
