import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RentCarStackParamList = {
  VehicleCategory: undefined,
  VehicleList: {
    category: string
  },
  VehicleDetail: {
    vehicleId: string
  },

  // bubbled up
  Tabs: undefined
}

export type RentCarNavigationProp<T extends keyof RentCarStackParamList> = StackNavigationProp<RentCarStackParamList, T>;

export type RentCarRouteProp<T extends keyof RentCarStackParamList> = RouteProp<RentCarStackParamList, T>; 
