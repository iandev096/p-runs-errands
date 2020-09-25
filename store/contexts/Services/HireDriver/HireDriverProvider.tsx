import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { HireDriverReducer } from './HireDriverReducer';
import { HireDriverContextInit, HireDriverContext } from './HireDriverContext';
import { HireDriverDispatchMiddleware } from './HireDriverDispatchMiddleware';

export const HireDriverProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(HireDriverReducer, HireDriverContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  //initializations
  const init = useCallback(async () => {
    try {
      setIsInitializing(true);
      await HireDriverDispatchMiddleware(dispatch)({ type: 'FETCH_DRIVERS' });
      setIsInitializing(false);
    } catch (err) {
      setIsInitializing(false);
      Alert.alert('Initialization Error', err.message);
    }
  }, [HireDriverDispatchMiddleware]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <HireDriverContext.Provider value={{
      dispatch: HireDriverDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      drivers: state.drivers,
      init: init,
    }}>
      {children}
    </HireDriverContext.Provider>
  );
};
