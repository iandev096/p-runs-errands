import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';
import { BottomNavigationProp } from '../BottomTabs/bottomTabs.types';
import { SERVICES } from '../../../data/services/data';
import { ServiceCard } from '../../../UIComponents/ServiceCard';

interface HomeScreenProps {
  navigation: BottomNavigationProp<'Home'>
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const navToService = (serviceName: string) => {
    navigation.navigate('Services', { screen: serviceName })
  }

  return (
      <Screen>
        <Container style={styles.container}>
          <View style={styles.inner}>
            <View style={styles.services}>
              {SERVICES.map(cardData => (
                <ServiceCard key={cardData.name} cardData={cardData} onPress={() => navToService(cardData.name)} />
              ))}
            </View>
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
    paddingHorizontal: 10,
  },
  services: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
