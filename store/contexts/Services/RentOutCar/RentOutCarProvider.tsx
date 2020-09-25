import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RentOutCarReducer } from './RentOutCarReducer';
import { RentOutCarContextInit, RentOutCarContext } from './RentOutCarContext';
import { RentOutCarDispatchMiddleware } from './RentOutCarDispatchMiddleware';

export const RentOutCarProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(RentOutCarReducer, RentOutCarContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  //initializations
  const init = useCallback(async () => {
    try {
      setIsInitializing(true);

      setIsInitializing(false);
    } catch (err) {
      setIsInitializing(false);
      Alert.alert('Initialization Error', err.message);
    }
  }, [RentOutCarDispatchMiddleware]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <RentOutCarContext.Provider value={{
      dispatch: RentOutCarDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      // init: init,
      vehicleDetails: state.vehicleDetails,
      driverOptions: state.driverOptions,
      additionalInfo: state.additionalInfo,
    }}>
      {children}
    </RentOutCarContext.Provider>
  );
};
