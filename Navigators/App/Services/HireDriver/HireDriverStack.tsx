import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'react-native-elements';
import { HireDriverStackParamList } from './types';
import { DriverCategoryScreen } from './DriverCategoryScreen';
import { DriverListScreen } from './DriverListScreen';
import { DriverDetailScreen } from './DriverDetail';
import { HireDriverProvider } from '../../../../store/contexts/Services/HireDriver/HireDriverProvider';

interface HireDriverStackProps {

}

const Stack = createStackNavigator<HireDriverStackParamList>();

export const HireDriverStack: React.FC<HireDriverStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <HireDriverProvider>
      <Stack.Navigator
        initialRouteName='DriverCategory'
        headerMode='none'
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='DriverCategory'
          component={DriverCategoryScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='DriverList'
          component={DriverListScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors?.primary }
          }}
          name='DriverDetail'
          component={DriverDetailScreen}
        />
      </Stack.Navigator>
    </HireDriverProvider>
  );
}
