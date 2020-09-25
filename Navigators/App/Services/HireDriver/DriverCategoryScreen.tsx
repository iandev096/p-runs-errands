import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HireDriverNavigationProp } from './types';
import { CategoryScreen } from '../../../../UIComponents/CategoryScreen';
import { DRIVER_CATEGORIES } from '../../../../data/hireDrivers/data';

interface DriverCategoryScreenProps {
  navigation: HireDriverNavigationProp<'DriverCategory'>
}

export const DriverCategoryScreen: React.FC<DriverCategoryScreenProps> = ({ navigation }) => {

  const navToList = (category: string) => {
    navigation.navigate('DriverList', { category })
  }

  return (
    <CategoryScreen
      categoriesList={DRIVER_CATEGORIES}
      navToList={navToList}
      smImg={true}
    />
  );
};

