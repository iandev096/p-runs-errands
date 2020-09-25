import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, Icon } from 'react-native-elements';
import { ServicesStackParamList } from './types';
import { BecomeDriverStack } from './BecomeDriver/BecomeDriverStack';
import { CargoGoodsStack } from './CargoGoods/CargoGoodsStack';
import { ErrandDeliveryStack } from './ErrandDelivery/ErrandDeliveryStack';
import { HireDriverStack } from './HireDriver/HireDriverStack';
import { RentCarStack } from './RentCar/RentCarStack';
import { RentOutCarStack } from './RentOutCar/RentOutCarStack';
import { SERVICE_NAME, SERVICE_NAME_EXP } from '../../../data/services/data';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';

interface ServicesStackProps {

}

const Stack = createStackNavigator<ServicesStackParamList>();

export const ServicesStack: React.FC<ServicesStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  const getNestedRouteName = (route: RouteProp<ServicesStackParamList, SERVICE_NAME_EXP>) => getFocusedRouteNameFromRoute(route);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerShown: true
      }}
    >
      <Stack.Screen
        options={({route}) => ({
          headerStyle: { backgroundColor: theme.colors?.primary },
          title: 'Become Driver'
        })}
        name={SERVICE_NAME.BecomeDriver}
        component={BecomeDriverStack}
      />
      <Stack.Screen
        options={({route}) => ({
          headerStyle: { backgroundColor: theme.colors?.primary },
          title: 'Cargo/Goods Services'
        })}
        name={SERVICE_NAME.CargoGoods}
        component={CargoGoodsStack}
      />
      <Stack.Screen
        options={({route}) => ({
          headerStyle: { backgroundColor: theme.colors?.primary },
          title: 'Errand/Delivery Services'
        })}
        name={SERVICE_NAME.ErrandDelivery}
        component={ErrandDeliveryStack}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerStyle: { backgroundColor: theme.colors?.primary },
          title: 'Hire Driver',
          headerShown: getNestedRouteName(route) === 'DriverDetail' ? false : true,
          headerLeft: (props) => {
            return <Icon
              type='ionicon'
              name='ios-home'
              color='#fff'
              containerStyle={{
                paddingLeft: 15
              }}
              {...props} />;
          }
        })}
        name={SERVICE_NAME.HireDriver}
        component={HireDriverStack}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerStyle: { backgroundColor: theme.colors?.primary },
          title: 'Rent Car',
          headerShown: getNestedRouteName(route) === 'VehicleDetail' ? false : true,
          headerLeft: (props) => {
            return <Icon
              type='ionicon'
              name='ios-home'
              color='#fff'
              containerStyle={{
                paddingLeft: 15
              }}
              {...props} />;
          }
        })}
        name={SERVICE_NAME.RentCar}
        component={RentCarStack}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors?.primary },
          title: 'Rent Out Car'
        }}
        name={SERVICE_NAME.RentOutCar}
        component={RentOutCarStack}
      />
    </Stack.Navigator>
  );
}
