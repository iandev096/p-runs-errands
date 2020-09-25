import { VEHICLE_TYPE } from "../../../data/hireDrivers/types";

export type HireDriverReq = {
  ownerUid: string;

  driverId: string,
  driverFirstName: string,
  driverLastName: string,
  vehicleTypes: string[] | Set<VEHICLE_TYPE>,

  driverProfileImage: any,
  drivingSince: number,

  requestorEmail: string,
  requestorFirstName: string,
  requestorLastName: string,
  requestorUid: string,

  completed: boolean,
  cancelled: boolean,
  canCancel: boolean,
}

export type RentCarReq = {
  carId: string,
  carImage: string,
  carMake: string,
  minPrice: number,
  fuelType: string,
  gearbox: string,

  requestorEmail: string,
  requestorFirstName: string,
  requestorLastName: string,
  requestorUid: string,

  completed: boolean,
  cancelled: boolean,
  canCancel: boolean,
};

export interface RequestsState {
  hireDrivers?: HireDriverReq[],
  rentCars?: RentCarReq[],
}

export type FetchHireDriverReqsAction = { type: 'FETCH_HIRE_DRIVERS_REQS' };
export type CancelHireDriverReqAction = { type: 'CANCEL_HIRE_DRIVER_REQ', payload: { driverId: string, requestorUid: string } }
export type GetHireDriverReqsAction = { type: 'GET_HIRE_DRIVER_REQS', payload: HireDriverReq[] };

export type FetchRentCarReqsAction = { type: 'FETCH_RENT_CAR_REQS' };
export type CancelRentCarReqAction = { type: 'CANCEL_RENT_CAR_REQ', payload: { carId: string, requestorUid: string } }
export type GetRentCarReqsAction = { type: 'GET_RENT_CAR_REQS', payload: RentCarReq[] };

export type RequestsAction =
  | GetHireDriverReqsAction
  | FetchHireDriverReqsAction
  | CancelHireDriverReqAction

  | GetRentCarReqsAction
  | FetchRentCarReqsAction
  | CancelRentCarReqAction
  ;

export type RequestsDispatch = (action: RequestsAction) => any;
