import React, { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RequestsNavigationProp, RequestsRouteProp, RequestsTabsKey } from './requests.types';
import { ThemeContext } from 'react-native-elements';
import { RequestsContext } from '../../../store/contexts/Requests/RequestsContext';
import { SERVICE_NAME } from '../../../data/services/data';
import { Container } from '../../../UIComponents/Container';
import { Screen } from '../../../UIComponents/Screen';
import { CustomSectionList } from '../../../UIComponents/CustomSectionList';

interface RequestListScreenProps {
  navigation: RequestsNavigationProp,
  route: RequestsRouteProp<RequestsTabsKey>
}

export const RequestListScreen: React.FC<RequestListScreenProps> = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const { dispatch, hireDrivers, rentCars } = useContext(RequestsContext);

  const renderRequests = useCallback(() => {
    switch (route.name) {
      case 'All':
        break;

      case SERVICE_NAME.HireDriver:
        let hireDriversList: JSX.Element[] = [];
        if (hireDrivers) {
          hireDrivers.forEach(driverRequest => {
            hireDriversList.push(<CustomSectionList
              key={driverRequest.ownerUid + driverRequest.requestorUid}
              title='Driver Request'
              titleBtn={{
                text: 'MORE',
                onPress: () => { }
              }}
              theme={theme}
              listItemsProps={[
                {
                  title: 'Name',
                  leftAvatar: { source: { uri: driverRequest.driverProfileImage.uri } },
                  subtitle: `${driverRequest.driverFirstName} ${driverRequest.driverLastName}`
                }
              ]}
              style={{ marginBottom: 25 }}
            />)
          })
          return <>
            {hireDriversList.length ? hireDriversList : <Text>No Driver Requests found</Text>}
          </>
        }
        return <View><Text>No requests made</Text></View>;

      case SERVICE_NAME.RentCar:
        if (rentCars) {
          let rentCarList: JSX.Element[] = [];
          rentCars.forEach(request => {
            rentCarList.push(<CustomSectionList
              key={request.carId}
              title='Car Request'
              titleBtn={{
                text: 'MORE',
                onPress: () => { }
              }}
              theme={theme}
              listItemsProps={[
                {
                  title: request.carMake,
                  bottomDivider: true,
                  leftAvatar: { source: { uri: request.carImage } },
                  subtitle: request.fuelType
                },
                {
                  title: 'Min Price',
                  bottomDivider: true,
                  subtitle: request.minPrice.toString(),
                }
              ]}
              style={{marginBottom: 25}}
            />)
          });
          return <>
            {rentCarList.length ? rentCarList : <Text>No Requests</Text>}
          </>
        }
        return <View><Text>No requests made</Text></View>;

      default:
        break;
    }
  }, [
    route.name,
    hireDrivers,
    rentCars
  ]);

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          {renderRequests()}
        </View>
      </Container>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height - 50,
  },
  inner: {
    width: '100%',
    height: '100%',
  },
  sectionList: {
    marginBottom: 16
  },
});
