import { ErrandDeliveryState, ErrandDeliveryAction } from "./types";

export const ErrandDeliveryReducer = (state: ErrandDeliveryState, action: ErrandDeliveryAction): ErrandDeliveryState => {
  switch (action.type) {
    case 'SET_DELIVERY':
      const delivery = action.payload;
      return {
        ...state,
        delivery
      };

    case 'REMOVE_DELIVERY':
      const stateAfterRemovedDelivery = { ...state };
      delete stateAfterRemovedDelivery.delivery;
      return {
        ...stateAfterRemovedDelivery
      };

    case 'SET_ERRAND':
      const errand = action.payload;
      return {
        ...state,
        errand
      }

    case 'REMOVE_ERRAND':
      const stateAfterRemovedErrand = {...state};
      delete stateAfterRemovedErrand.errand
      return {
        ...stateAfterRemovedErrand
      }

    default:
      return state;
  }
}