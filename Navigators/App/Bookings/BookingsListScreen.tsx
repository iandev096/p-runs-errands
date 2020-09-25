import React, { useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BookingsNavigationProp, BookingsRouteProp, BookingsTabsKey } from './bookings.types';
import { SERVICE_NAME } from '../../../data/services/data';
import { CustomSectionList } from '../../../UIComponents/CustomSectionList';
import { BookingsContext } from '../../../store/contexts/Bookings/BookingsContext';
import { Container } from '../../../UIComponents/Container';
import { Screen } from '../../../UIComponents/Screen';
import { ThemeContext, Theme } from 'react-native-elements';
import { MapPreview } from '../../../UIComponents/MapPreview';
import { arrToStrList } from '../../../util/stringUtil';
import { FadeTitleText } from '../../../UIComponents/FadeTitleText';

interface BookingsListScreenProps {
  navigation: BookingsNavigationProp;
  route: BookingsRouteProp<BookingsTabsKey>
}

function MapPreviewListItem({ theme, lat, lng, label }: { theme: Theme, lat: number, lng: number, label: string }) {
  return <View
    style={{
      borderTopColor: theme.colors?.grey2,
      borderTopWidth: 0.5,
      backgroundColor: 'white',
      padding: 10
    }}
  >
    <Text style={{ fontSize: 16 }} >{label}</Text>
    <MapPreview
      theme={theme}
      location={{ lat: lat, lng: lng }} />
  </View>
}

export const BookingsListScreen: React.FC<BookingsListScreenProps> = ({ navigation, route }) => {
  const { dispatch, cargoGoods, delivery, driverService, errand, rentCarService } = useContext(BookingsContext)
  const { theme } = useContext(ThemeContext);

  const renderBookings = useCallback(() => {
    switch (route.name) {
      case 'All':
        return <View><Text>All</Text></View>;

      case SERVICE_NAME.BecomeDriver:
        if (driverService) {
          return <CustomSectionList
            title='Become Driver Boooking'
            titleBtn={{
              text: 'MORE',
              onPress: () => { }
            }}
            theme={theme}
            listItemsProps={[
              {
                title: 'Name',
                leftAvatar: { source: { uri: driverService.detail.profileImage.uri } },
                subtitle: driverService.detail.firstName + ' ' + driverService.detail.lastName,
              },
              {
                bottomDivider: true,
                Component: () => <MapPreviewListItem
                  theme={theme}
                  label='Current Location'
                  lat={driverService.detail.currentLocation!.lat}
                  lng={driverService.detail.currentLocation!.lng}
                />
              },
              {
                title: 'Primary Address',
                subtitle: driverService.detail.address1,
                containerStyle: {
                  borderTopColor: theme.colors?.grey2,
                  borderTopWidth: 0.5,
                }
              },
              {
                title: 'Skills',
                subtitle: arrToStrList(driverService.detail.skills),
                containerStyle: {
                  borderTopColor: theme.colors?.grey2,
                  borderTopWidth: 0.5,
                }
              },
              {
                title: 'Vehicle Types',
                subtitle: arrToStrList(driverService.detail.vehicleTypes),
                containerStyle: {
                  borderTopColor: theme.colors?.grey2,
                  borderTopWidth: 0.5,
                }
              }
            ]}
          />;
        }
        return <View><Text>No bookings made</Text></View>;

      case SERVICE_NAME.ErrandDelivery:
        if (errand || delivery) {
          let errandBookingsList: JSX.Element[] = [];
          let deliveryBookingsList: JSX.Element[] = [];
          if (errand) {
            errand.forEach(errandBooking => {
              errandBookingsList.push(<CustomSectionList
                title='Errand Boooking'
                key={errandBooking.docId}
                titleBtn={{
                  text: 'MORE',
                  onPress: () => { }
                }}
                listItemsProps={[
                  {
                    bottomDivider: true,
                    Component: () => <MapPreviewListItem
                      theme={theme}
                      label='From'
                      lat={errandBooking.detail.from!.lat}
                      lng={errandBooking.detail.from!.lng}
                    />
                  },
                  {
                    bottomDivider: true,
                    Component: () => <MapPreviewListItem
                      theme={theme}
                      label='To'
                      lat={errandBooking.detail.to!.lat}
                      lng={errandBooking.detail.to!.lng}
                    />
                  },
                  {
                    title: 'Instructions',
                    subtitle: errandBooking.detail.instructions,
                    containerStyle: {
                      borderTopColor: theme.colors?.grey2,
                      borderTopWidth: 0.5,
                    }
                  }
                ]}
                style={{ marginBottom: 25 }}
                theme={theme}
              />);
            })
          }
          if (delivery) {
            delivery.forEach(deliveryBooking => {
              deliveryBookingsList.push(<CustomSectionList
                key={deliveryBooking.docId}
                title='Delivery Boooking'
                titleBtn={{
                  text: 'MORE',
                  onPress: () => { }
                }}
                listItemsProps={[
                  {
                    bottomDivider: true,
                    Component: () => <MapPreviewListItem
                      theme={theme}
                      label='From'
                      lat={deliveryBooking.detail.from!.lat}
                      lng={deliveryBooking.detail.from!.lng}
                    />
                  },
                  {
                    bottomDivider: true,
                    Component: () => <MapPreviewListItem
                      theme={theme}
                      label='To'
                      lat={deliveryBooking.detail.to!.lat}
                      lng={deliveryBooking.detail.to!.lng}
                    />
                  },
                  {
                    title: 'Instructions',
                    subtitle: deliveryBooking.detail.instructions,
                    containerStyle: {
                      borderTopColor: theme.colors?.grey2,
                      borderTopWidth: 0.5,
                    }
                  }
                ]}
                style={{ marginBottom: 25 }}
                theme={theme}
              />);
            })
          }

          return <>
            <FadeTitleText style={{ marginBottom: 13 }} theme={theme}>Errand Bookings</FadeTitleText>
            {errandBookingsList.length ? errandBookingsList : <Text>No Errand bookings</Text>}

            <FadeTitleText style={{ marginBottom: 13 }} theme={theme}>Delivery Bookings</FadeTitleText>
            {deliveryBookingsList.length ? deliveryBookingsList : <Text>No Delivery bookings</Text>}

          </>;
        }
        return <View><Text>No bookings found</Text></View>;

      case SERVICE_NAME.CargoGoods:
        let cargoGoodsBookingList: JSX.Element[] = [];
        if (cargoGoods) {
          cargoGoods.forEach(cargoGoodsBooking => {
            cargoGoodsBookingList.push(
              <CustomSectionList
                key={cargoGoodsBooking.docId}
                title='Cargo Goods Boooking'
                titleBtn={{
                  text: 'MORE',
                  onPress: () => { }
                }}
                listItemsProps={[
                  {
                    bottomDivider: true,
                    Component: () => <MapPreviewListItem
                      theme={theme}
                      label='From'
                      lat={cargoGoodsBooking.detail.from!.lat}
                      lng={cargoGoodsBooking.detail.from!.lng}
                    />
                  },
                  {
                    bottomDivider: true,
                    Component: () => <MapPreviewListItem
                      theme={theme}
                      label='To'
                      lat={cargoGoodsBooking.detail.to!.lat}
                      lng={cargoGoodsBooking.detail.to!.lng}
                    />
                  },
                  {
                    title: 'Nature of Cargo',
                    subtitle: cargoGoodsBooking.detail.cargoNature,
                    containerStyle: {
                      borderTopColor: theme.colors?.grey2,
                      borderTopWidth: 0.5,
                    }
                  },
                  {
                    title: 'Estimated Quantity',
                    subtitle: cargoGoodsBooking.detail.estimatedQuatity,
                    containerStyle: {
                      borderTopColor: theme.colors?.grey2,
                      borderTopWidth: 0.5,
                    }
                  }
                ]}
                style={{ marginBottom: 25 }}
                theme={theme}
              />
            )
          })
          return <>
            {cargoGoodsBookingList.length ? cargoGoodsBookingList : <Text>No Errand bookings</Text>}
          </>
        }
        return <View><Text>No bookings found</Text></View>;

      case SERVICE_NAME.RentOutCar:
        if (rentCarService) {
          let carBookingList: JSX.Element[] = [];
          rentCarService.forEach(booking => {
            carBookingList.push(<CustomSectionList
              key={booking.docId}
              title='Car Boooking'
              titleBtn={{
                text: 'MORE',
                onPress: () => { }
              }}
              theme={theme}
              listItemsProps={[
                {
                  title: booking.detail.make,
                  bottomDivider: true,
                  leftAvatar: { source: { uri: booking.detail.vehicleImage.uri } },
                  subtitle: booking?.detail?.category?.join(' • ')
                },
                {
                  title: 'Description',
                  bottomDivider: true,
                  subtitle: booking.detail.description,
                },
                {
                  title: 'Expected Rent Price / Day',
                  bottomDivider: true,
                  subtitle: `GH${booking.detail.expectedRentPerDay}`
                },
                {
                  title: 'Expected Rent Price / Half',
                  bottomDivider: true,
                  subtitle: `GH${booking.detail.expectedRentPerHalf}`
                },
                {
                  title: 'Number Plate',
                  subtitle: booking.detail.regPlateNumber
                }
              ]}
              style={{marginBottom: 25}}
            />)
          });
          return <>
            {carBookingList.length ? carBookingList : <Text>No Errand bookings</Text>}
          </>
        }
        return <View><Text>No bookings Made</Text></View>;

      default:
        return null;
    }
  }, [
    route.name,
    cargoGoods,
    delivery,
    driverService,
    errand,
    rentCarService
  ])

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          {renderBookings()}
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
