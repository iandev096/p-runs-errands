import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { SERVICE_NAME } from '../../../data/services/data';

export type ServicesStackParamList = {
  [SERVICE_NAME.BecomeDriver]: undefined,
  [SERVICE_NAME.CargoGoods]: undefined,
  [SERVICE_NAME.ErrandDelivery]: undefined,
  [SERVICE_NAME.HireDriver]: undefined,
  [SERVICE_NAME.RentCar]: undefined,
  [SERVICE_NAME.RentOutCar]: undefined
}

export type ServicesNavigationProp<T extends keyof ServicesStackParamList> = StackNavigationProp<ServicesStackParamList, T>;

export type ServicesRouteProp<T extends keyof ServicesStackParamList> = RouteProp<ServicesStackParamList, T>; 

