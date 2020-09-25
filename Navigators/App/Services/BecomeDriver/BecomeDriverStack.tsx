import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'react-native-elements';
import { BecomeDriverStackParamList } from './types';
import { DriverInfoScreen } from './DriverInfoScreen';
import { LicenseInfoScreen } from './LicenseInfoScreen';
import { ContactAddressScreen } from './ContactAddressScreen';
import { BecomeDriverProvider } from '../../../../store/contexts/Services/BecomeDriver/BecomeDriverProvider';

interface BecomeDriverStackProps {

}

const Stack = createStackNavigator<BecomeDriverStackParamList>();

export const BecomeDriverStack: React.FC<BecomeDriverStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <BecomeDriverProvider>
      <Stack.Navigator
        initialRouteName='DriverInfo'
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='DriverInfo'
          component={DriverInfoScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='LicenseInfo'
          component={LicenseInfoScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='ContactAddress'
          component={ContactAddressScreen}
        />
      </Stack.Navigator>
    </BecomeDriverProvider>
  );
}
