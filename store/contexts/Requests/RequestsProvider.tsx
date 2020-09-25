import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RequestsReducer } from './RequestsReducer';
import { RequestsContextInit, RequestsContext } from './RequestsContext';
import { RequestsDispatchMiddleware } from './RequestsDispatchMiddleware';

export const RequestsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(RequestsReducer, RequestsContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  //initializations
  const init = useCallback(async () => {
    try {
      console.log('req is initializing');
      setIsInitializing(true);
      await RequestsDispatchMiddleware(dispatch)({ type: 'FETCH_HIRE_DRIVERS_REQS' });
      await RequestsDispatchMiddleware(dispatch)({ type: 'FETCH_RENT_CAR_REQS' });
      setIsInitializing(false);
      console.log('req is done initializing');      
    } catch (err) {
      setIsInitializing(false);
      Alert.alert('Initialization Error', err.message);
    }
  }, [RequestsDispatchMiddleware]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <RequestsContext.Provider value={{
      dispatch: RequestsDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      hireDrivers: state.hireDrivers,
      rentCars: state.rentCars
      // init: init,
    }}>
      {children}
    </RequestsContext.Provider>
  );
};
