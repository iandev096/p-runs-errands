import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Button, ThemeContext, Theme } from 'react-native-elements';
import { AuthNavigationProp, AuthRouteProp } from './auth.types';
import { Screen } from '../../UIComponents/Screen';
import { Image } from 'react-native-elements';
import { LinkText } from '../../UIComponents/LinkText';
import { NormalText } from '../../UIComponents/NormalText';
import { FeatureText } from '../../UIComponents/FeatureText';
import { AuthContext } from '../../store/contexts/Auth/AuthProvider';
import { Container } from '../../UIComponents/Container';
import { SignupModal } from './SignupModal';
import { LoginModal } from './LoginModal';

interface AuthScreenProps {
  navigation: AuthNavigationProp<'Auth'>,
  route: AuthRouteProp<'Auth'>
}

const googleIcon = <Icon name='google' type='font-awesome' color='red' style={{ marginRight: 10 }} />

export const AuthScreen: React.FC<AuthScreenProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);
  const { login, signup } = useContext(AuthContext);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <SignupModal
        onClose={() => setShowSignupModal(false)}
        isVisible={showSignupModal}
        onSignup={signup}
        theme={theme}
      />
      <LoginModal
        onClose={() => setShowLoginModal(false)}
        isVisible={showLoginModal}
        onLogin={login}
        theme={theme}
      />
      <Screen>
        <Container style={styles.container}>
          <View style={styles.inner}>
           <View style={{alignItems: "center"}}>
           <Image
              source={require('../../assets/logo.png')}
              style={styles.heroImage}
            />
           </View>
            <View style={styles.verticalTextGroup}>
              <FeatureText center theme={theme}>
                Quality delivery services
              </FeatureText>
              <FeatureText center theme={theme}>
                We've got the right solution
              </FeatureText>
              <FeatureText center theme={theme}>
                Lowest prices guaranteed
              </FeatureText>
            </View>
            <View style={styles.ctaGroup}>
              <Button
                onPress={() => setShowLoginModal(true)}
                titleStyle={styles.ctaButtonText}
                buttonStyle={styles.ctaButton}
                type='outline'
                icon={googleIcon}
                title='CONTINUE WITH GOOGLE'
              />
              <NormalText style={{ color: theme.colors?.grey2, marginVertical: 25 }}>
                - OR USE EMAIL -
            </NormalText>
              <View style={styles.horizontalButtons}>
                <Button onPress={() => setShowLoginModal(true)} titleStyle={styles.ctaButtonText} buttonStyle={{ ...styles.ctaButton, ...styles.horizontalButtonsLayout }} title='LOG IN' />
                <Button onPress={() => setShowSignupModal(true)} titleStyle={styles.ctaButtonText} buttonStyle={{ ...styles.ctaButton, ...styles.horizontalButtonsLayout }} title='REGISTER' type='outline' />
              </View>
            </View>
          </View>
        </Container>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    minHeight: Dimensions.get('screen').height,
  },
  inner: {
    width: '100%',
    marginBottom: 40
  },
  heroImage: {
    width: 300,
    height: 300,
  },
  verticalTextGroup: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  ctaGroup: {
    alignItems: 'center'
  },
  ctaButton: {
    paddingVertical: 15,
    // paddingHorizontal: 15,
  },
  ctaButtonText: {
    fontSize: 20,
  },
  horizontalButtons: {
    flexDirection: 'row',
  },
  horizontalButtonsLayout: {
    marginHorizontal: 10,
    paddingHorizontal: 26
  }
});
