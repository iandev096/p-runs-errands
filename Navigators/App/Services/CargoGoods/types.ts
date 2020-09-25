import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type CargoGoodsStackParamList = {
  CargoDetails: undefined,
  
  //bubbled up
  Tabs: undefined
}

export type CargoGoodsNavigationProp<T extends keyof CargoGoodsStackParamList> = StackNavigationProp<CargoGoodsStackParamList, T>;

export type CargoGoodsRouteProp<T extends keyof CargoGoodsStackParamList> = RouteProp<CargoGoodsStackParamList, T>; 
