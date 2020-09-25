import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ErrandDeliveryNavigationProp } from './types';
import { Screen } from '../../../../UIComponents/Screen';
import { Container } from '../../../../UIComponents/Container';
import { FadeTitleText } from '../../../../UIComponents/FadeTitleText';
import { ED_CATEGORIES } from '../../../../data/services/data';
import { CategoryCard } from '../../../../UIComponents/CategoryCard';
import { ThemeContext } from 'react-native-elements';

interface ErrandDeliveryCategoryScreenProps {
  navigation: ErrandDeliveryNavigationProp<'ErrandDeliveryCategory'>
}

export const ErrandDeliveryCategoryScreen: React.FC<ErrandDeliveryCategoryScreenProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <FadeTitleText theme={theme}>Select Service</FadeTitleText>
          <View style={styles.categories}>
            {ED_CATEGORIES.map(cardData => (
              <CategoryCard
                key={cardData.name}
                name={cardData.name}
                imageUrl={cardData.imageUrl}
                onPress={() => {
                  if (cardData.type === 'delivery') navigation.navigate('Delivery');
                  if (cardData.type === 'errand') navigation.navigate('Errand');
                }}
                smImg={true}
              />
            ))}
          </View>
        </View>
      </Container>
    </Screen>
  );
};

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
  categories: {
    marginTop: 10
  },
});
