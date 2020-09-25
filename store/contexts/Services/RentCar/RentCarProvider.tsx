import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RentCarReducer } from './RentCarReducer';
import { RentCarContextInit, RentCarContext } from './RentCarContext';
import { RentCarDispatchMiddleware } from './RentCarDispatchMiddleware';

export const RentCarProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(RentCarReducer, RentCarContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  //initializations
  const init = useCallback(async () => {
    try {
      setIsInitializing(true);
      await RentCarDispatchMiddleware(dispatch)({ type: 'FETCH_VEHICLES' });
      setIsInitializing(false);
    } catch (err) {
      setIsInitializing(false);
      Alert.alert('Initialization Error', err.message);
    }
  }, [RentCarDispatchMiddleware]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <RentCarContext.Provider value={{
      dispatch: RentCarDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      cars: state.cars,
      // init: init,

    }}>
      {children}
    </RentCarContext.Provider>
  );
};
