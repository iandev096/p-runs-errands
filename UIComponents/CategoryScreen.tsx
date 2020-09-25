import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Screen } from './Screen';
import { ThemeContext } from 'react-native-elements';
import { Container } from './Container';
import { FadeTitleText } from './FadeTitleText';
import { CategoryCard } from './CategoryCard';

interface CategoryScreenProps {
  navToList: (category: string) => void;
  categoriesList: { name: string, imageUrl: string} [];
  smImg?: boolean;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ navToList, categoriesList, smImg }) => {

  const { theme } = useContext(ThemeContext);

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <FadeTitleText theme={theme}>Select Category</FadeTitleText>
          <View style={styles.categories}>
            {categoriesList.map(cardData => (
              <CategoryCard
                key={cardData.name}
                name={cardData.name}
                imageUrl={cardData.imageUrl}
                onPress={() => navToList(cardData.name)}
                smImg={smImg}
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