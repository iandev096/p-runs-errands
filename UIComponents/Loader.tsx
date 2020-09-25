import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Text, Theme } from 'react-native-elements';

interface LoaderProps {
  transparent?: boolean;
  isLoading: boolean;
  label?: string;
  theme: Theme;
}

export const Loader: React.FC<LoaderProps> = ({ theme, isLoading, transparent, label }) => {

  return (
    <Modal
      transparent={transparent}
      animationType={'none'}
      visible={isLoading}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
          size='large'
          color={theme.colors?.primary}
            animating={isLoading} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  label: {
    textAlign: 'center'
  }
});