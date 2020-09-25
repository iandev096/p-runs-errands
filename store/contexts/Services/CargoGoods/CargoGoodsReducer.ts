import { CargoGoodsState, CargoGoodsAction } from "./types";

export const CargoGoodsReducer = (state: CargoGoodsState, action: CargoGoodsAction): CargoGoodsState => {
  switch (action.type) {
    case 'SET_CARGO_GOODS':
      const cargoGoodsDetails = action.payload;
      return {
        ...state,
        cargoDetails: cargoGoodsDetails
      }

    case 'REMOVE_CARGO_GOODS':
      const stateAfterRemovedCargo = { ...state };
      delete stateAfterRemovedCargo.cargoDetails;
      return {
        ...stateAfterRemovedCargo
      };

    default:
      return state;
  }
}