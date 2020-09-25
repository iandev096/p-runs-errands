import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { CustomCard } from './CustomCard';
import TouchableScale from 'react-native-touchable-scale';
import { LinkText } from './LinkText';
import theme from '../constants/theme';
import { Image } from 'react-native-elements';

interface CategoryCardProps {
  onPress: Function;
  name: string;
  imageUrl: any;
  smImg?: boolean
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ onPress, name, imageUrl, smImg }) => {

  return (
    <CustomCard key={name} containerStyle={styles.category}>
      <TouchableScale onPress={() => onPress()}>
        <LinkText>{name}</LinkText>
        <View style={styles.imageContainer}>
          <Image
            PlaceholderContent={
              <View style={styles.cardImgPlaceholderContent}>
                <ActivityIndicator color={theme.colors?.primary} />
              </View>
            }
            style={{
              height:  110,
              width: smImg ? 110 : 190
            }}
            source={imageUrl}
          />
        </View>
      </TouchableScale>
    </CustomCard>

  );
};

const styles = StyleSheet.create({

  category: {
    margin: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {

  },
  cardImgPlaceholderContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});