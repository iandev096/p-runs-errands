import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { BookingsReducer } from './BookingsReducer';
import { BookingsContextInit, BookingsContext } from './BookingsContext';
import { BookingsDispatchMiddleware } from './BookingsDispatchMiddleware';

export const BookingsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(BookingsReducer, BookingsContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  //initializations
  const init = useCallback(async () => {
    try {
      setIsInitializing(true);
      console.log('isInitializing')
      await BookingsDispatchMiddleware(dispatch)({ type: 'FETCH_CARGO_GOODS_BOOKING' });
      await BookingsDispatchMiddleware(dispatch)({ type: 'FETCH_DRIVER_SERVICE_BOOKING' });
      await BookingsDispatchMiddleware(dispatch)({ type: 'FETCH_ERRAND_BOOKING' });
      await BookingsDispatchMiddleware(dispatch)({ type: 'FETCH_DELIVERY_BOOKING' });
      await BookingsDispatchMiddleware(dispatch)({ type: 'FETCH_RENT_CAR_SERVICE_BOOKING' });
      setIsInitializing(false);
      console.log('doneInitializing')
    } catch (err) {
      setIsInitializing(false);
      Alert.alert('Initialization Error', err.message);
    }
  }, [BookingsDispatchMiddleware]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <BookingsContext.Provider value={{
      dispatch: BookingsDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      cargoGoods: state.cargoGoods,
      delivery: state.delivery,
      driverService: state.driverService,
      errand: state.errand,
      rentCarService: state.rentCarService
      // init: init,
    }}>
      {children}
    </BookingsContext.Provider>
  );
};
