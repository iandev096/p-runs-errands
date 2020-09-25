import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { MapPreview } from './MapPreview';
import { NormalText } from './NormalText';
import { Theme, Button } from 'react-native-elements';
import { Center } from './Center';
import { MapModal } from './MapModal';

type Location = { lat: number, lng: number };
interface LocationInputProps {
  initialLocation?: Location,
  errorMessage?: string,
  label?: string,
  theme: Theme,

  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => any,
  onLocationChange: (location: { lat: number, lng: number }) => any
}

const verifyPermissions = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  if (result.status !== 'granted') {
    Alert.alert('Insufficient permissions', 'You need to grant location permissions to use this feature.',
      [{ text: 'OK' }]);
    return false;
  }
  return true;
}

export const LocationInput: React.FC<LocationInputProps> = ({ initialLocation, errorMessage, label, setFieldValue, onLocationChange, theme }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | undefined>();
  const [showMapModal, setShowMapModal] = useState(false);

  useEffect(() => {
    if (errorMessage && (!location)) setErr(errorMessage);
    else setErr(undefined);
  }, [errorMessage, location]);

  const locationChangeHandler = (location: Location) => {
    if (setFieldValue) {
      setFieldValue('lat', location.lat, true);
      setFieldValue('lng', location.lng, true);
    }

    // for react-form-hook
    onLocationChange({ lat: location.lat, lng: location.lng })
  }

  useEffect(() => {
    if (location) locationChangeHandler(location);
  }, [location]);

  const currentHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) return;

      setIsLoading(true);

      const locationResult = await Location.getCurrentPositionAsync({
        timeout: 7000,
      });

      setLocation({
        lat: locationResult.coords.latitude,
        lng: locationResult.coords.longitude
      });

      setIsLoading(false);
    } catch (err) {
      Alert.alert(
        'Could not fetch location',
        'Please try again or pick a location on the map.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
    }
  }

  const mapHandler = () => setShowMapModal(true);
  const hideMapModal = () => {
    setShowMapModal(false);
  };
  const onLocationSelectedOnMap = (location: Location) => {
    setLocation(location);
    locationChangeHandler(location);
  };

  return (
    <>
      <MapModal
        isVisible={showMapModal}
        theme={theme}
        readOnly={false}
        onClose={hideMapModal}
        onLocationSelected={onLocationSelectedOnMap}
        initialLocation={location}
      />
      <View style={styles.locationInput}>
        <NormalText style={styles.label}>{label ?? 'Location'}</NormalText>
        <MapPreview
          onPress={() => mapHandler()}
          location={location}
          initialLocation={initialLocation}
          theme={theme}
          style={styles.mapPreview}
        >
          {
            isLoading ?
              <Center>
                <ActivityIndicator size='large' color={theme.colors?.primary} />
              </Center> :
              <NormalText>No Location chosen yet.</NormalText>
          }
        </MapPreview>
        {err && <NormalText style={{ ...styles.errorText, color: theme.colors?.error }}>
          {err}
        </NormalText>}

        <View style={styles.actions}>
          <Button type='clear' buttonStyle={{backgroundColor: 'rgba(0, 153, 255, 0.0546)'}} title='Current' onPress={() => currentHandler()} />
          <Button type='clear' buttonStyle={{backgroundColor: 'rgba(0, 153, 255, 0.0546)'}} title='From map' onPress={() => mapHandler()} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  locationInput: {
    marginVertical: 15,
    width: '100%'
  },
  label: {
    marginBottom: 15
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    alignSelf: 'flex-start',
    marginRight: 15
  },
  mapPreview: {
    marginBottom: 10
  },
  errorText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  }
});
