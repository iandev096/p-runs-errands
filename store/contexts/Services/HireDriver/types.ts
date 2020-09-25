import { Driver } from "../../../../data/hireDrivers/types";

export type DriverStateProp = {
  docId: string,
  isAvailable: boolean,
  detail: Driver
}
export interface HireDriverState {
  drivers?: DriverStateProp[];
}

export type FetchDriversAction = { type: 'FETCH_DRIVERS' };
export type GetDriversAction = { type: 'GET_DRIVERS', payload: DriverStateProp[] };

type Personal = { firstName: string, lastName: string, mobileNumber: string, email: string };
export type HireAction = {
  type: 'HIRE_DRIVER',
  payload: Personal & DriverStateProp
};

export type HireDriverAction =
  | FetchDriversAction
  | GetDriversAction

  | HireAction
  ;

export type HireDriverDispatch = (action: HireDriverAction) => any;
