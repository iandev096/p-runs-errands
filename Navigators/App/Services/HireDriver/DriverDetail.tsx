import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { ThemeContext, Button, ListItem } from 'react-native-elements';
import { Screen } from '../../../../UIComponents/Screen';
import { TextOverlaidImage } from '../../../../UIComponents/TextOverlaidImage';
import { FadeTitleText } from '../../../../UIComponents/FadeTitleText';
import { SectionTitle } from '../../../../UIComponents/SectionTitle';
import { FeatureText } from '../../../../UIComponents/FeatureText';
import { HireDriverNavigationProp, HireDriverRouteProp } from './types';
import { DriverStateProp } from '../../../../store/contexts/Services/HireDriver/types';
import { HireDriverContext } from '../../../../store/contexts/Services/HireDriver/HireDriverContext';
import { Loader } from '../../../../UIComponents/Loader';
import { AccountContext } from '../../../../store/contexts/Account/AccountContext';

interface DriverDetailScreenProps {
  navigation: HireDriverNavigationProp<'DriverDetail'>,
  route: HireDriverRouteProp<'DriverDetail'>
}

export const DriverDetailScreen: React.FC<DriverDetailScreenProps> = ({ navigation, route }) => {
  const { dispatch, drivers } = useContext(HireDriverContext);
  const [driver, setDriver] = useState<DriverStateProp>();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { contactDetails } = useContext(AccountContext);

  useEffect(() => {
    if (route.params.driverId && drivers) {
      setDriver(drivers.find(driver => driver.docId === route.params.driverId));
    }
  }, [route.params.driverId, drivers]);

  const hireDriver = useCallback(async () => {
    try {
      if (driver && dispatch && contactDetails) {
        setIsLoading(true);
        await dispatch({
          type: 'HIRE_DRIVER',
          payload: { 
            docId: driver.docId,
            detail: driver.detail,
            email: contactDetails.email,
            firstName: contactDetails.firstName,
            isAvailable: driver.isAvailable,
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
  }, [dispatch, driver]);

  const getArrFromSet = (set: Set<string> | undefined) => {
    if (set) {
      return Array.from(set);
    }
  }

  const goBack = () => navigation.goBack();

  return (
    <>
      <Loader isLoading={isLoading} theme={theme} transparent/>
      <View style={{ flex: 1 }}>
        <View style={styles.driverInfo}>
          <TextOverlaidImage
            source={driver?.detail?.imageUrl}
            theme={theme}
            solidImgBorders={true}
            style={{ height: 300 }}
            imageText={{ show: driver?.isAvailable ? false : true, text: 'NOT AVAILABLE' }}
          />
          <FadeTitleText theme={theme} style={{ padding: 10 }} numberOfLines={1} >{driver?.detail?.firstName + ' ' + driver?.detail?.lastName}</FadeTitleText>
        </View>
        <Screen style={styles.vehicleDetails}>
          <ListItem
            title='Vehicle types'
            subtitle={getArrFromSet(driver?.detail?.typesOfVehicles)?.join(' • ')}
            leftIcon={{ name: 'ios-car', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <ListItem
            title='Lincense name'
            subtitle={driver?.detail?.nameOnLicense}
            leftIcon={{ name: 'ios-contact', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          {/* <ListItem
          title='Deposit'
          subtitle={'GH₵' + vehicle?.deposit}
          leftIcon={{ name: 'ios-card', type: 'ionicon', color: theme.colors?.primary }}
          bottomDivider
        /> */}
          <ListItem
            title='About'
            subtitle={driver?.detail?.about}
            leftIcon={{ name: 'ios-book', type: 'ionicon', color: theme.colors?.primary }}
            bottomDivider
          />
          <View style={{ margin: 10 }}>
            <SectionTitle theme={theme}>Skills</SectionTitle>
            {getArrFromSet(driver?.detail?.skills)?.map(info => (
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
              title='HIRE NOW'
              onPress={() => hireDriver()}
              containerStyle={{ flexBasis: '49%' }} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  driverInfo: {
    elevation: 3,
    backgroundColor: 'white',
    maxHeight: Dimensions.get('screen').height * 0.5,
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
