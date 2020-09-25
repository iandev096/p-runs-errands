import React from 'react';
import { View, Text, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import { FadeTitleText } from './FadeTitleText';
import { Screen } from './Screen';
import { Button, Theme } from 'react-native-elements';

interface FormScreenProps {
  leftFooterButton: {
    title: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined
  },
  rightFooterButton: {
    title: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined
    disabled?: boolean,
  },
  isLoading?: boolean;
  heading: string;
  theme: Theme
}

export const FormScreen: React.FC<FormScreenProps> = ({ leftFooterButton, rightFooterButton, theme, isLoading, heading, children }) => {

  return (
    <View style={{ flex: 1 }}>
      <FadeTitleText style={{ padding: 10 }} theme={theme}>{heading}</FadeTitleText>
      <Screen style={styles.mainContent}>
        {children}
      </Screen>
      <View style={styles.footer}>
        <View style={styles.footerBtnGroup}>
          <Button
            disabled={isLoading}
            title={leftFooterButton.title}
            type='outline'
            onPress={leftFooterButton.onPress}
            containerStyle={{ flexBasis: '48%', marginRight: 'auto' }} />
          <Button
            loading={isLoading}
            disabled={rightFooterButton.disabled}
            title={rightFooterButton.title}
            onPress={rightFooterButton.onPress}
            containerStyle={{ flexBasis: '49%', marginLeft: 'auto' }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height - 50,
  },
  mainContent: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    flexGrow: 1
  },
  footer: {
    paddingHorizontal: 10,
    flexGrow: 0,
    flexBasis: 65,
    height: 65,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBtnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
