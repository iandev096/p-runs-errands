import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type BottomTabsParamList = {
  Home: undefined,
  Bookings: undefined,
  Account: undefined,
  Requests: undefined,
  
  // bubbled up
  Services: any
}

export type BottomNavigationProp<T extends keyof BottomTabsParamList> = BottomTabNavigationProp<BottomTabsParamList, T>
export type BottomRouteProp<T extends keyof BottomTabsParamList> = RouteProp<BottomTabsParamList, T>;