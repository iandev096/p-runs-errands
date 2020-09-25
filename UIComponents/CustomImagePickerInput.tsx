import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Theme, Image, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

interface CustomImagePickerInputProps {
  label: string;
  errorMessage?: string;
  theme: Theme,
  disabled?: boolean;
  onValueChanged: (image: ImagePickerImg) => any;
}
export type ImagePickerImg = { base64?: string, uri: string };
export const CustomImagePickerInput: React.FC<CustomImagePickerInputProps> = ({ label, onValueChanged, theme, disabled, errorMessage }) => {
  const [image, setImage] = useState<ImagePickerImg>();
  const [error, setError] = useState<any>();
  const [showErrMsg, setShowErrMsg] = useState(true);

  useEffect(() => {
    if (image) {
      onValueChanged(image);
      setError(null);
      setShowErrMsg(false);
    }
  }, [image]);

  useEffect(() => {
    async function getPermission() {
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, you need to grant camera permission to continue');
        }
      }
    }
    getPermission();
  }, []);

  const launchCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5
      });
      if (!result.cancelled) {
        setImage({ uri: result.uri })
      }

    } catch (err) {
      setError(err);
    }
  }

  const launchLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        setImage({ uri: result.uri })
      }

    } catch (err) {
      setError(err);
    }
  }

  const pickImage = async () => {
    if (disabled) return;
    Alert.alert('Image Selector', 'Select image from:', [
      {
        onPress: () => launchCamera().then(),
        text: 'Camera'
      },
      {
        onPress: () => launchLibrary().then(),
        text: 'Library'
      },
    ]);
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 9,
        padding: 10
      }}
    >
      <Text style={{
        fontWeight: 'bold',
        color: theme.colors?.grey3,
        fontSize: 16,
        marginBottom: 10
      }}>{label}</Text>
      <TouchableScale onPress={() => pickImage()}>
        <View style={[styles.imgContainer, {
          opacity: disabled ? 0.7 : 1,
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: theme.colors?.grey4,
          justifyContent: image?.uri ? undefined : 'center',
          alignItems: image?.uri ? undefined : 'center',
        }]}>
          {image?.uri ? <Image
            resizeMode='cover'
            source={{ uri: image?.uri }}
            style={styles.img}
            PlaceholderContent={
              <View style={styles.imgPlaceholderContent}>
                <ActivityIndicator color={theme.colors?.primary} />
              </View>
            }
          /> :
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon type='ionicon' color='#fff' name='ios-camera' size={30} />
              <Text style={{ fontSize: 18, color: '#fff', marginLeft: 5 }} >Select Image</Text>
            </View>
          }
        </View>
      </TouchableScale>
      {error?.message && <Text style={{ color: theme.colors?.error, fontSize: 12 }}>{error?.message}</Text>}
      {showErrMsg && errorMessage && <Text style={{ color: theme.colors?.error, fontSize: 12 }}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: '100%',
    height: 200,
  },
  img: {
    width: '100%',
    height: '100%'
  },
  imgPlaceholderContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
