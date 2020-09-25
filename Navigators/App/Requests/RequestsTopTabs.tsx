import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContext } from 'react-native-elements';
import { RequestsTabsParamList } from './requests.types';
import { RequestListScreen } from './RequestListScreen';
import { SERVICES, SERVICE_NAME } from '../../../data/services/data';
import { RequestsProvider } from '../../../store/contexts/Requests/RequestsProvider';

interface RequestsTopTabsProps {

}

const TopTabs = createMaterialTopTabNavigator<RequestsTabsParamList>();

export const RequestsTopTabs: React.FC<RequestsTopTabsProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <RequestsProvider>
      <TopTabs.Navigator
        tabBarOptions={{
          activeTintColor: theme.colors?.primary,
          inactiveTintColor: theme.colors?.grey3,
          indicatorStyle: { backgroundColor: theme.colors?.primary },
        }}
        lazy
      >
        {/* <TopTabs.Screen
        options={{ title: 'All' }}
        name='All'
        component={RequestListScreen}
      /> */}
        {SERVICES
          .filter(service =>
            (service.name == SERVICE_NAME.RentCar) ||
            (service.name == SERVICE_NAME.HireDriver)
          ).map(data => (
            <TopTabs.Screen
              key={data.name}
              options={{ title: data.title }}
              name={data.name as SERVICE_NAME.RentCar | SERVICE_NAME.HireDriver}
              component={RequestListScreen}
            />
          ))}
      </TopTabs.Navigator>
    </RequestsProvider>
  );
}
