import { RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { SERVICE_NAME } from "../../../data/services/data";

export type RequestsTabsParamList = {
  All: undefined,
  [SERVICE_NAME.HireDriver]: undefined,
  [SERVICE_NAME.RentCar]: undefined,
}

export type RequestsTabsKey = keyof RequestsTabsParamList;
export type RequestsRouteProp<T extends keyof RequestsTabsParamList> = RouteProp<RequestsTabsParamList, T>;
export type RequestsNavigationProp = MaterialTopTabNavigationProp<RequestsTabsParamList>
