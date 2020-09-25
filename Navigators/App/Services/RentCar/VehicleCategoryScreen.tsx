import React from 'react';
import { VEHICLE_CATEGORIES } from '../../../../data/vehicles/data';
import { RentCarNavigationProp } from './types';
import { CategoryScreen } from '../../../../UIComponents/CategoryScreen';

interface VehicleCategoryScreenProps {
  navigation: RentCarNavigationProp<'VehicleCategory'>
}

export const VehicleCategoryScreen: React.FC<VehicleCategoryScreenProps> = ({ navigation }) => {

  const navToList = (category: string) => {
    navigation.navigate('VehicleList', { category })
  }

  return (
    <CategoryScreen 
      categoriesList={VEHICLE_CATEGORIES}
      navToList={navToList}
    />
   );
};
