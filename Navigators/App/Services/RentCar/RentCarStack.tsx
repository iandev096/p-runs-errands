import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'react-native-elements';
import { RentCarStackParamList } from './types';
import { VehicleCategoryScreen } from './VehicleCategoryScreen';
import { VehicleListScreen } from './VehicleListScreen';
import { VehicleDetailScreen } from './VehicleDetailScreen';
import { RentCarProvider } from '../../../../store/contexts/Services/RentCar/RentCarProvider';

interface RentCarStackProps {

}

const Stack = createStackNavigator<RentCarStackParamList>();

export const RentCarStack: React.FC<RentCarStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <RentCarProvider>
      <Stack.Navigator
        initialRouteName='VehicleCategory'
        headerMode='none'
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='VehicleCategory'
          component={VehicleCategoryScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='VehicleList'
          component={VehicleListScreen}
        />
        <Stack.Screen
          name='VehicleDetail'
          component={VehicleDetailScreen}
        />
      </Stack.Navigator>
    </RentCarProvider>
  );
}