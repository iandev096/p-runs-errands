import { RentCarState, RentCarAction } from "./types";

export const RentCarReducer = (state: RentCarState, action: RentCarAction): RentCarState => {
  switch (action.type) {
    case 'GET_VEHICLES':
      const cars = action.payload;
      return {
        ...state,
        cars
      }

    default:
      return state;
  }
}