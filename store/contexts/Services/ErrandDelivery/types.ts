import { ErrandFormData } from "../../../../constants/form/errandDelivery/errand/type";
import { DeliveryFormData } from "../../../../constants/form/errandDelivery/delivery/type";

export interface ErrandDeliveryState {
  errand?: ErrandFormData,
  delivery?: DeliveryFormData
}

export type SetErrandAction = { type: 'SET_ERRAND', payload: ErrandFormData };
export type RemoveErrandAction = { type: 'REMOVE_ERRAND' };
export type PostErrandAction = { type: 'POST_ERRAND', payload: ErrandFormData };

export type SetDeliveryAction = { type: 'SET_DELIVERY', payload: DeliveryFormData };
export type RemoveDeliveryAction = { type: 'REMOVE_DELIVERY' };
export type PostDeliveryAction = { type: 'POST_DELIVERY', payload: ErrandFormData };

export type ErrandDeliveryAction =
  | SetErrandAction
  | RemoveErrandAction
  | PostErrandAction

  | SetDeliveryAction
  | RemoveDeliveryAction
  | PostDeliveryAction
  ;

export type ErrandDeliveryDispatch = (action: ErrandDeliveryAction) => any;
