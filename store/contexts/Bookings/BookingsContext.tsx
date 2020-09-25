import { createContext } from 'react';
import { BookingsState, BookingsDispatch } from './types';

interface  BookingsContextProps extends BookingsState {
  dispatch: BookingsDispatch;
  init?: () => Promise<any>;
  isInitializing?: boolean
}

export const BookingsContextInit: BookingsContextProps = {
  cargoGoods: undefined,
  delivery: undefined,
  driverService: undefined,
  errand: undefined,
  rentCarService: undefined,
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const BookingsContext = createContext<BookingsContextProps>(BookingsContextInit);
