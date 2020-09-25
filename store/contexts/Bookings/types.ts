import { CargoDetailsFormData } from "../../../constants/form/cargoDetails/types";
import { RentOutCarData } from "../Services/RentOutCar/types";
import { ErrandFormData } from "../../../constants/form/errandDelivery/errand/type";
import { DeliveryFormData } from "../../../constants/form/errandDelivery/delivery/type";
import { PostedBecomeDriver } from '../Services/BecomeDriver/types';

type ID = { docId: string };
export type BecomeDriverBooking = {
  isAvailable: boolean,
  uid: string,
  detail: PostedBecomeDriver
} & ID
export type CargoGoodBooking = {
  completed: boolean,
  canCancel: boolean,
  cancelled: boolean,
  uid: string,
  detail: CargoDetailsFormData
} & ID
export type RentCarBooking = {
  uid: string,
  detail: RentOutCarData,
  isAvailable: boolean
} & ID
export type ErrandBooking = {
  completed: boolean,
  canCancel: boolean,
  cancelled: boolean,
  uid: string,
  detail: ErrandFormData
} & ID
export type DeliveryBooking = {
  completed: boolean,
  canCancel: boolean,
  cancelled: boolean,
  uid: string,
  detail: DeliveryFormData
} & ID
export interface BookingsState {
  cargoGoods?: CargoGoodBooking[],
  driverService?: BecomeDriverBooking,
  errand?: ErrandBooking[],
  delivery?: DeliveryBooking[],
  rentCarService?: RentCarBooking[],
}

export type FetchCargoGoodsBookingAction = { type: 'FETCH_CARGO_GOODS_BOOKING' };
export type GetCargoGoodsBookingAction = { type: 'GET_CARGO_GOODS_BOOKING', payload: CargoGoodBooking[] }
export type CancelCargoGoodsBookingAction = { type: 'CANCEL_CARGO_GOODS_BOOKING', payload: ID };

export type FetchDriverServiceBookingAction = { type: 'FETCH_DRIVER_SERVICE_BOOKING' };
export type GetDriverServiceBookingAction = { type: 'GET_DRIVER_SERVICE_BOOKING', payload: BecomeDriverBooking }
export type CancelDriverServiceBookingAction = { type: 'CANCEL_DRIVER_SERVICE_BOOKING', payload: ID };

export type FetchErrandBookingAction = { type: 'FETCH_ERRAND_BOOKING' };
export type GetErrandBookingAction = { type: 'GET_ERRAND_BOOKING', payload: ErrandBooking[] }
export type CancelErrandBookingAction = { type: 'CANCEL_ERRAND_BOOKING', payload: ID };

export type FetchDeliveryBookingAction = { type: 'FETCH_DELIVERY_BOOKING' };
export type GetDeliveryBookingAction = { type: 'GET_DELIVERY_BOOKING', payload: DeliveryBooking[] }
export type CancelDeliveryBookingAction = { type: 'CANCEL_DELIVERY_BOOKING', payload: ID };

export type FetchRentCarServiceBookingAction = { type: 'FETCH_RENT_CAR_SERVICE_BOOKING' };
export type GetRentCarServiceBookingAction = { type: 'GET_RENT_CAR_SERVICE_BOOKING', payload: RentCarBooking[] }
export type CancelRentCarServiceBookingAction = { type: 'CANCEL_RENT_CAR_SERVICE_BOOKING', payload: ID };

export type BookingsAction =
  | FetchCargoGoodsBookingAction
  | GetCargoGoodsBookingAction
  | CancelCargoGoodsBookingAction

  | FetchDriverServiceBookingAction
  | GetDriverServiceBookingAction
  | CancelDriverServiceBookingAction

  | FetchErrandBookingAction
  | GetErrandBookingAction
  | CancelErrandBookingAction

  | FetchDeliveryBookingAction
  | GetDeliveryBookingAction
  | CancelDeliveryBookingAction

  | FetchRentCarServiceBookingAction
  | GetRentCarServiceBookingAction
  | CancelRentCarServiceBookingAction
  ;

export type BookingsDispatch = (action: BookingsAction) => any;
