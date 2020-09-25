import { RentOutCarState, RentOutCarAction } from "./types";

export const RentOutCarReducer = (state: RentOutCarState, action: RentOutCarAction): RentOutCarState => {
  switch (action.type) {
    case 'SET_VEHICLE_DETAILS':
      const vehicleDetails = action.payload;
      return {
        ...state,
        vehicleDetails
      }

    case 'REMOVE_VEHICLE_DETAILS':
      const stateAfterRemovedVehicleDetails = { ...state };
      delete stateAfterRemovedVehicleDetails.vehicleDetails;
      return {
        ...stateAfterRemovedVehicleDetails
      }

    case 'SET_DRIVER_OPTIONS':
      const driverOptions = action.payload;
      return {
        ...state,
        driverOptions
      }

    case 'REMOVE_DRIVER_OPTIONS':
      const stateAfterRemovedDriverOptions = { ...state };
      delete stateAfterRemovedDriverOptions.vehicleDetails;
      return {
        ...stateAfterRemovedDriverOptions
      }

    case 'SET_ADDITIONAL_INFO':
      const additionalInfo = action.payload;
      return {
        ...state,
        additionalInfo
      }

    case 'REMOVE_ADDITIONAL_INFO':
      const stateAfterRemovedAdditional = { ...state };
      delete stateAfterRemovedAdditional.driverOptions;
      return {
        ...stateAfterRemovedAdditional
      }

    default:
      return state;
  }
}
