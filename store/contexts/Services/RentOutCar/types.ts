import { VehicleDetailFormData } from '../../../../constants/form/rentOutCar/vehicleDetails/types';
import { DriverOptionsFormData } from '../../../../constants/form/rentOutCar/driverOptions/types';
import { AdditionalInfoFormData } from '../../../../constants/form/rentOutCar/additionalInfo/types';

export interface RentOutCarState {
  vehicleDetails?: VehicleDetailFormData,
  driverOptions?: DriverOptionsFormData,
  additionalInfo?: AdditionalInfoFormData
}

export type SetVehicleDetailsAction = { type: 'SET_VEHICLE_DETAILS', payload: VehicleDetailFormData };
export type RemoveVehicleDetailsAction = { type: 'REMOVE_VEHICLE_DETAILS' };

export type SetDriverOptionsAction = { type: 'SET_DRIVER_OPTIONS', payload: DriverOptionsFormData };
export type RemoveDriverOptionsAction = { type: 'REMOVE_DRIVER_OPTIONS' };

export type SetAdditionalInfoAction = { type: 'SET_ADDITIONAL_INFO', payload: AdditionalInfoFormData };
export type RemoveAdditionalInfoAction = { type: 'REMOVE_ADDITIONAL_INFO' };

export type RentOutCarData = VehicleDetailFormData & DriverOptionsFormData & AdditionalInfoFormData;
export type PostRentOutCarAction = { type: 'POST_RENT_OUT_CAR', payload: RentOutCarData };

export type RentOutCarAction =
  | SetVehicleDetailsAction
  | RemoveVehicleDetailsAction

  | SetDriverOptionsAction
  | RemoveDriverOptionsAction

  | SetAdditionalInfoAction
  | RemoveAdditionalInfoAction

  | PostRentOutCarAction
  ;

export type RentOutCarDispatch = (action: RentOutCarAction) => any;
