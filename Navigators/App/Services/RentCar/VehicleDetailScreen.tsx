import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { ThemeContext, Button, ListItem } from 'react-native-elements';
import { RentCarNavigationProp, RentCarRouteProp } from './types';
import { ADDITIONAL_INFO } from '../../../../data/vehicles/types';
import { Screen } from '../../../../UIComponents/Screen';
import { TextOverlaidImage } from '../../../../UIComponents/TextOverlaidImage';
import { FadeTitleText } from '../../../../UIComponents/FadeTitleText';
import { SectionTitle } from '../../../../UIComponents/SectionTitle';
import { FeatureText } from '../../../../UIComponents/FeatureText';
import { Car } from '../../../../store/contexts/Services/RentCar/types';
import { RentCarContext } from '../../../../store/contexts/Services/RentCar/RentCarContext';
import { Loader } from '../../../../UIComponents/Loader';
import { AccountContext } from '../../../../store/contexts/Account/AccountContext';

interface VehicleDetailScreenProps {
  navigation: RentCarNavigationProp<'VehicleDetail'>,
  route: RentCarRouteProp<'VehicleDetail'>
}

export const VehicleDetailScreen: React.FC<VehicleDetailScreenProps> = ({ navigation, route }) => {
  const [vehicle, setVehicle] = useState<Car>();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, cars } = useContext(RentCarContext);
  const { theme } = useContext(ThemeContext);
  const { contactDetails } = useContext(AccountContext);

  useEffect(() => {
    if (route.params.vehicleId && cars) {
      setVehicle(cars.find(car => car.docId === route.params.vehicleId));
    }
  }, [route.params.vehicleId, cars]);

  const rentCar = useCallback(async () => {
    try {
      if (vehicle && dispatch && contactDetails) {
        setIsLoading(true);
        await dispatch({
          type: 'RENT_CAR', payload: {
            docId: vehicle.docId,
            detail: vehicle.detail,
            email: contactDetails.email,
            firstName: contactDetails.firstName,
            isAvailable: vehicle.isAvailable,
            lastName: contactDetails.lastName,
            mobileNumber: contactDetails.mobileNumber
          }
        });
        setIsLoading(false);
        Alert.alert('Success', 'We have received your request', [{ onPress: () => navigation.navigate('Tabs') }])
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Error', 'Unable to process request. Please check your internet connection');
    }
  }, [dispatch, vehicle]);

  const getAdditionalInfo = (additionalInfo: Set<ADDITIONAL_INFO> | undefined) => {
    if (additionalInfo) {
      return Array.from(additionalInfo);
    }
  }

  const goBack = () => navigation.goBack();

  return (
    <>
      <Loader isLoading={isLoading} theme={theme} transparent />
      <View style={{ flex: 1 }}>
        <View style={styles.vehicleInfo}>
          <TextOverlaidImage
            source={{ uri: vehicle?.detail?.imageUrl }}
            theme={theme}
            solidImgBorders={true}
            imageText={{ show: vehicle?.isAvailable ? false : true, text: 'NOT AVAILABLE' }}
          />
          <FadeTitleText theme={theme} style={{ padding: 10 }} numberOfLines={1} >{vehicle?.detail?.make}</FadeTitleText>
        </View>
        <Screen style={styles.vehicleDetails}>
          <ListItem
            title='Categories'
            subtitle={vehicle?.detail?.category?.join(' • ')}
            leftIcon={{ name: 'ios-car', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <ListItem
            title='Gearbox'
            subtitle={vehicle?.detail?.gearbox}
            leftIcon={{ name: 'ios-settings', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          {/* <ListItem
          title='Deposit'
          subtitle={'GH₵' + vehicle?.deposit}
          leftIcon={{ name: 'ios-card', type: 'ionicon', color: theme.colors?.primary }}
          bottomDivider
        /> */}
          <ListItem
            title='Fuel'
            subtitle={'GH₵' + vehicle?.detail?.fuelType}
            leftIcon={{ name: 'ios-color-fill', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <ListItem
            title='Min Price / Day'
            subtitle={'GH₵' + vehicle?.detail?.pricePerDay}
            leftIcon={{ name: 'ios-cash', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <ListItem
            title='Min Price / Half Day'
            subtitle={'GH₵' + vehicle?.detail?.pricePerHalf}
            leftIcon={{ name: 'ios-cash', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <ListItem
            title='Mileage'
            subtitle={vehicle?.detail?.mileage.toString()}
            leftIcon={{ name: 'ios-speedometer', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <ListItem
            title='Deposit'
            subtitle={'GH₵' + vehicle?.detail?.deposit}
            leftIcon={{ name: 'ios-book', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <View style={{ margin: 10 }}>
            <SectionTitle theme={theme}>Additional Info</SectionTitle>
            {getAdditionalInfo(vehicle?.detail?.additionalInfo)?.map(info => (
              <FeatureText key={info.toString()} theme={theme}>{info}</FeatureText>
            ))}
          </View>
        </Screen>
        <View style={styles.footer}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <Button
              title='GO BACK'
              type='outline'
              onPress={() => goBack()}
              containerStyle={{ flexBasis: '48%' }} />
            <Button
              title='BOOK NOW'
              onPress={() => rentCar()}
              containerStyle={{ flexBasis: '49%' }} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  vehicleInfo: {
    elevation: 3,
    backgroundColor: 'white',
    maxHeight: Dimensions.get('screen').height * 0.5,
  },
  image: {
    width: '100%',
    height: 200,
    maxHeight: Dimensions.get('screen').height * 0.3,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vehicleDetails: {

  },
  footer: {
    paddingHorizontal: 10,
    height: 65,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});