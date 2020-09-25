import { Vehicle } from '../../../../data/vehicles/types';

export type Car = {
  docId: string,
  isAvailable: boolean,
  detail: Vehicle
};
export interface RentCarState {
  cars?: Car[];
}

export type FetchVehiclesAction = { type: 'FETCH_VEHICLES' };
export type GetVehiclesAction = { type: 'GET_VEHICLES', payload: Car[] }

type Personal = { firstName: string, lastName: string, mobileNumber: string, email: string };
export type RentAction = {
  type: 'RENT_CAR',
  payload: Personal & Car
};

export type RentCarAction =
  | FetchVehiclesAction
  | GetVehiclesAction

  | RentAction
  ;

export type RentCarDispatch = (action: RentCarAction) => any;
