import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from 'react-native-elements';
import { AuthContext } from '../../../store/contexts/Auth/AuthProvider';
import { HeaderRightButton } from '../../../UIComponents/HeaderRightButton';
import { BottomTabsParamList } from './bottomTabs.types';
import { HomeScreen } from '../Home/HomeScreen';
import { AppNavigationProp, AppRouteProp } from '../Index/app.types';
import { AccountScreen } from '../Account/AccountScreen';
import { RequestsTopTabs } from '../Requests/RequestsTopTabs';
import { BookingsTopTabs } from '../Bookings/BookingsTopTabs';

interface BottomTabsProps {
  navigation: AppNavigationProp<'Tabs'>
  route: AppRouteProp<'Tabs'>
}

const BottomTabsNavigator = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs: React.FC<BottomTabsProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const [header, setHeader] = useState('Home');

  useEffect(() => {
    let headerRight: ((props: {
      tintColor?: string | undefined;
    }) => React.ReactNode) | undefined;

    if (header === 'Account') {
      headerRight = () => (<HeaderRightButton
        title='LOGOUT'
        color={theme.colors?.error}
        onPress={() => logout()}
      />);
    }
    navigation.setOptions({
      headerTitle: header,
      headerRight
    });
  }, [header]);

  return (
    <BottomTabsNavigator.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors?.primary,
        inactiveTintColor: theme.colors?.grey3,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName!: string;

          if (route.name === 'Home') iconName = 'ios-home';
          else if (route.name === 'Bookings') iconName = 'ios-albums'
          else if (route.name === 'Requests') iconName = 'ios-contacts';
          else if (route.name === 'Account') iconName = 'ios-person';

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Services')
        })}
        name='Home' component={HomeScreen}
      />
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Bookings')
        })}
        name='Bookings' component={BookingsTopTabs}
      />
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Requests')
        })}
        name='Requests' component={RequestsTopTabs}
      />
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Account')
        })}
        name='Account' component={AccountScreen}
      />
    </BottomTabsNavigator.Navigator>
  );
}