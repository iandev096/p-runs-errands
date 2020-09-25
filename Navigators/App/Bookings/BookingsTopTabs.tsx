import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContext } from 'react-native-elements';
import { BookingsTabsParamList } from './bookings.types';
import { BookingsListScreen } from './BookingsListScreen';
import { SERVICE_NAME, SERVICES } from '../../../data/services/data';
import { BookingsProvider } from '../../../store/contexts/Bookings/BookingsProvider';

interface BookingsTopTabsProps {

}

const TopTabs = createMaterialTopTabNavigator<BookingsTabsParamList>();

export const BookingsTopTabs: React.FC<BookingsTopTabsProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <BookingsProvider>
      <TopTabs.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: theme.colors?.primary,
          inactiveTintColor: theme.colors?.grey3,
          indicatorStyle: { backgroundColor: theme.colors?.primary }
        }}
      >
        {/* <TopTabs.Screen
          options={{ title: 'All' }}
          name='All'
          component={BookingsListScreen}
        /> */}
        {
          SERVICES
            .filter(service =>
              (service.name !== SERVICE_NAME.RentCar) &&
              (service.name !== SERVICE_NAME.HireDriver)
            )
            .map(data => (
              <TopTabs.Screen
                key={data.name}
                options={{ title: data.title }}
                name={data.name as SERVICE_NAME}
                component={BookingsListScreen}
              />
            ))
        }
      </TopTabs.Navigator>
    </BookingsProvider>
  );
}
