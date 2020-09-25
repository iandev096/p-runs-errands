import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'react-native-elements';
import { ErrandDeliveryStackParamList } from './types';
import { ErrandDeliveryCategoryScreen } from './ErrandDeliveryCategoryScreen';
import { ErrandScreen } from './ErrandScreen';
import { DeliveryScreen } from './DeliveryScreen';
import { ErrandDeliveryProvider } from '../../../../store/contexts/Services/ErrandDelivery/ErrandDeliveryProvider';

interface ErrandDeliveryStackProps {

}

const Stack = createStackNavigator<ErrandDeliveryStackParamList>();

export const ErrandDeliveryStack: React.FC<ErrandDeliveryStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ErrandDeliveryProvider>
      <Stack.Navigator
        initialRouteName='ErrandDeliveryCategory'
        headerMode='none'
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='ErrandDeliveryCategory'
          component={ErrandDeliveryCategoryScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='Errand'
          component={ErrandScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='Delivery'
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </ErrandDeliveryProvider>
  );
}