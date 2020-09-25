import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { BecomeDriverReducer } from './BecomeDriverReducer';
import { BecomeDriverContextInit, BecomeDriverContext } from './BecomeDriverContext';
import { BecomeDriverDispatchMiddleware } from './BecomeDriverDispatchMiddleware';

export const BecomeDriverProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(BecomeDriverReducer, BecomeDriverContextInit);

  return (
    <BecomeDriverContext.Provider value={{
      dispatch: BecomeDriverDispatchMiddleware(dispatch),
      driverInfo: state.driverInfo,
      licenseInfo: state.licenseInfo,
      contactAddress: state.contactAddress
      // init: init,
    }}>
      {children}
    </BecomeDriverContext.Provider>
  );
};
