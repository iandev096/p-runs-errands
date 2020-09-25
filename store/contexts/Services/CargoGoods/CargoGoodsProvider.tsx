import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { CargoGoodsReducer } from './CargoGoodsReducer';
import { CargoGoodsContextInit, CargoGoodsContext } from './CargoGoodsContext';
import { CargoGoodsDispatchMiddleware } from './CargoGoodsDispatchMiddleware';

export const CargoGoodsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(CargoGoodsReducer, CargoGoodsContextInit);
  const [isInitializing, setIsInitializing] = useState(false);
  
  return (
    <CargoGoodsContext.Provider value={{
      dispatch: CargoGoodsDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      cargoDetails: state.cargoDetails
      // init: init,
    }}>
      {children}
    </CargoGoodsContext.Provider>
  );
};
