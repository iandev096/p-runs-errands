import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Container } from '../../../../UIComponents/Container';
import { FadeTitleText } from '../../../../UIComponents/FadeTitleText';
import { ThemeContext } from 'react-native-elements';
import { VehicleList } from './VehicleList';
import { RentCarNavigationProp, RentCarRouteProp } from './types';
import { RentCarContext } from '../../../../store/contexts/Services/RentCar/RentCarContext';
import { Car } from '../../../../store/contexts/Services/RentCar/types';

interface VehicleListScreenProps {
  navigation: RentCarNavigationProp<'VehicleList'>,
  route: RentCarRouteProp<'VehicleList'>
}

export const VehicleListScreen: React.FC<VehicleListScreenProps> = ({ navigation, route }) => {
  const { cars, dispatch } = useContext(RentCarContext);
  const [refreshing, setRefreshing] = useState(false);
  const [filterdVehicles, setFilterdVehicles] = useState<Car[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (route.params.category && cars) {
      const currentCategory = route.params.category;
      const filtered = cars.filter((car) => {
        return car.detail.category.some(category => category.toString() === currentCategory);
      });

      setFilterdVehicles(filtered);
    }
  }, [route.params.category, cars]);


  const navToDetail = (vehicleId: string) => {
    navigation.navigate('VehicleDetail', { vehicleId });
  }

  const onRefresh = useCallback(async () => {
    if (!dispatch) return;
    try {
      setRefreshing(true);
    await dispatch({type: 'FETCH_VEHICLES'})
    setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
      Alert.alert('Error', 'Unable to fetch cars. Please check your internet connection');
    }
  }, [dispatch]);

  return (
    <Container style={styles.container}>
      <View style={styles.inner}>
        <FadeTitleText theme={theme}>Select Vehicle</FadeTitleText>
        <View style={styles.vehicles}>
          <VehicleList
            vehicles={filterdVehicles}
            theme={theme}
            navToDetail={navToDetail}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </View>
      </View>
    </Container>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height - 50,
  },
  inner: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  vehicles: {
    marginTop: 10
  },
});