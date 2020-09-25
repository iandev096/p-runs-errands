import { RequestsState, RequestsAction } from "./types";

export const RequestsReducer = (state: RequestsState, action: RequestsAction): RequestsState => {
  switch (action.type) {
    case 'CANCEL_RENT_CAR_REQ':
      const updatedRentCarReq = state.rentCars?.map(carReq => {
        if ((carReq.carId === action.payload.carId) &&
          (carReq.requestorUid === action.payload.requestorUid) &&
          (carReq.cancelled !== true)) carReq.cancelled = true;
        return carReq;
      });
      return {
        ...state,
        rentCars: updatedRentCarReq
      }

    case 'GET_RENT_CAR_REQS':
      const rentCarReqs = action.payload;
      return {
        ...state,
        rentCars: rentCarReqs
      }

    case 'CANCEL_HIRE_DRIVER_REQ':
      const updatedHireDriversReq = state.hireDrivers?.map(driverReq => {
        if ((driverReq.driverId === action.payload.driverId) &&
          (driverReq.requestorUid === action.payload.requestorUid) &&
          (!driverReq.cancelled)) driverReq.cancelled = true;
        return driverReq;
      });
      return {
        ...state,
        hireDrivers: updatedHireDriversReq
      }

    case 'GET_HIRE_DRIVER_REQS':
      const hireDriverReqs = action.payload;
      return {
        ...state,
        hireDrivers: hireDriverReqs
      }

    default:
      return state;
  }
}