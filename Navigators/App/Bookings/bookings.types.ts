import { RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { SERVICE_NAME } from "../../../data/services/data";

export type BookingsTabsParamList = {
  All: undefined,
  [SERVICE_NAME.BecomeDriver]: undefined,
  [SERVICE_NAME.CargoGoods]: undefined,
  [SERVICE_NAME.ErrandDelivery]: undefined,
  [SERVICE_NAME.HireDriver]: undefined,
  [SERVICE_NAME.RentCar]: undefined,
  [SERVICE_NAME.RentOutCar]: undefined,
}

export type BookingsTabsKey = keyof BookingsTabsParamList;
export type BookingsRouteProp<T extends keyof BookingsTabsParamList> = RouteProp<BookingsTabsParamList, T>;
export type BookingsNavigationProp = MaterialTopTabNavigationProp<BookingsTabsParamList>
