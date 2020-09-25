import { CargoDetailsFormData } from "../../../../constants/form/cargoDetails/types";

export interface CargoGoodsState {
  cargoDetails?: CargoDetailsFormData
}

export type SetCargoGoodsAction = { type: 'SET_CARGO_GOODS', payload: CargoDetailsFormData };
export type RemoveCargoGoodsAction = { type: 'REMOVE_CARGO_GOODS' };
export type PostCargoGoodsAction = { type: 'POST_CARGO_GOODS', payload: CargoDetailsFormData };

export type CargoGoodsAction =
  | SetCargoGoodsAction
  | RemoveCargoGoodsAction
  
  | PostCargoGoodsAction
  ;

export type CargoGoodsDispatch = (action: CargoGoodsAction) => any;
