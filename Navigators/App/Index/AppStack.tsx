import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList } from './app.types';
import { ThemeContext, IconProps, withBadge, Icon } from 'react-native-elements';
import { BottomTabs } from '../BottomTabs/BottomTabs';
import { EditAddressScreen } from '../Account/EditAddressScreen';
import { EditContactDetailsScreen } from '../Account/EditContactDetailsScreen';
import { EditPaymentMethodsScreen } from '../Account/EditPaymentMethodsScreen';
import { ServicesStack } from '../Services/ServicesStack';
import { AccountContextProvider } from '../../../store/contexts/Account/AccountContext';

interface AppStackProps {

}

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack: React.FC<AppStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  let BadgedIcon: React.ComponentType<IconProps> = withBadge(1)(Icon);
  useEffect(() => {
    BadgedIcon = withBadge(3)(Icon);
  }, []);

  return (
    <AccountContextProvider>
      <Stack.Navigator
        initialRouteName='Tabs'
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='Tabs'
          component={BottomTabs}
        />

        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary },
            headerShown: false
          }}
          name='Services'
          component={ServicesStack}
        />

        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='EditAddress'
          component={EditAddressScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='EditContact'
          component={EditContactDetailsScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='EditPaymentMethods'
          component={EditPaymentMethodsScreen}
        />
      </Stack.Navigator>
    </AccountContextProvider>
  );
}
