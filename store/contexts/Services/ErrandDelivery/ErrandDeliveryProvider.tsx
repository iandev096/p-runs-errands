import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { ErrandDeliveryReducer } from './ErrandDeliveryReducer';
import { ErrandDeliveryContextInit, ErrandDeliveryContext } from './ErrandDeliveryContext';
import { ErrandDeliveryDispatchMiddleware } from './ErrandDeliveryDispatchMiddleware';

export const ErrandDeliveryProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(ErrandDeliveryReducer, ErrandDeliveryContextInit);
  
  return (
    <ErrandDeliveryContext.Provider value={{
      dispatch: ErrandDeliveryDispatchMiddleware(dispatch),
      delivery: state.delivery,
      errand: state.errand
      // init: init,
    }}>
      {children}
    </ErrandDeliveryContext.Provider>
  );
};
