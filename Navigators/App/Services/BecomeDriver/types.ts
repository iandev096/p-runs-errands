import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type BecomeDriverStackParamList = {
  DriverInfo: undefined,
  LicenseInfo: undefined,
  ContactAddress: undefined,
  
  //bubbled up
  Tabs: undefined
}

export type BecomeDriverNavigationProp<T extends keyof BecomeDriverStackParamList> = StackNavigationProp<BecomeDriverStackParamList, T>;

export type BecomeDriverRouteProp<T extends keyof BecomeDriverStackParamList> = RouteProp<BecomeDriverStackParamList, T>; 
