import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Container } from '../../../../UIComponents/Container';
import { FadeTitleText } from '../../../../UIComponents/FadeTitleText';
import { ThemeContext } from 'react-native-elements';
import { Driver } from '../../../../data/hireDrivers/types';
import { DriverList } from './DriverList';
import { HireDriverNavigationProp, HireDriverRouteProp } from './types';
import { HireDriverContext } from '../../../../store/contexts/Services/HireDriver/HireDriverContext';

interface DriverListScreenProps {
  navigation: HireDriverNavigationProp<'DriverList'>,
  route: HireDriverRouteProp<'DriverList'>
}

export const DriverListScreen: React.FC<DriverListScreenProps> = ({ navigation, route }) => {
  const { drivers, dispatch } = useContext(HireDriverContext);
  const { theme } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);

  const navToDetail = (driverId: string) => {
    navigation.navigate('DriverDetail', { driverId });
  }

  const onRefresh = useCallback(async () => {
    if (!dispatch) return;
    try {
      setRefreshing(true);
      await dispatch({ type: 'FETCH_DRIVERS' })
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
      Alert.alert('Error', 'Unable to fetch drivers. Please check your internet connection');
    }
  }, [dispatch]);

  return (
    <Container style={styles.container}>
      <View style={styles.inner}>
        <FadeTitleText theme={theme}>Select Driver</FadeTitleText>
        <View style={styles.vehicles}>
          {drivers && <DriverList
            drivers={drivers}
            theme={theme}
            navToDetail={navToDetail}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />}
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