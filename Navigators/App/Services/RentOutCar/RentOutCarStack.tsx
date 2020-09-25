import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'react-native-elements';
import { RentOutCarStackParamList } from './types';
import { VehicleDetailsScreen } from './VehicleDetailsScreen';
import { DriverOptionsScreen } from './DriverOptionsScreen';
import { AdditionalInfoScreen } from './AdditionalInfoScreen';
import { RentOutCarProvider } from '../../../../store/contexts/Services/RentOutCar/RentOutCarProvider';

interface RentOutCarStackProps {

}

const Stack = createStackNavigator<RentOutCarStackParamList>();

export const RentOutCarStack: React.FC<RentOutCarStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <RentOutCarProvider>
      <Stack.Navigator
        initialRouteName='VehicleDetails'
        headerMode='none'
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='VehicleDetails'
          component={VehicleDetailsScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='DriverOptions'
          component={DriverOptionsScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='AdditionalInfo'
          component={AdditionalInfoScreen}
        />
      </Stack.Navigator>
    </RentOutCarProvider>
  );
}