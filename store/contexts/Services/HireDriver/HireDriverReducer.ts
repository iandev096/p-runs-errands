import { HireDriverState, HireDriverAction } from "./types";

export const HireDriverReducer = (state: HireDriverState, action: HireDriverAction): HireDriverState => {
  switch (action.type) {
    case 'GET_DRIVERS':
    const drivers = action.payload
      return {
        ...state,
        drivers
      }

    default:
      return state;
  }
}