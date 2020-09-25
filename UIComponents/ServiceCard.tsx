import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { CustomCard } from './CustomCard';
import TouchableScale from 'react-native-touchable-scale';
import theme from '../constants/theme';
import { NormalText } from './NormalText';
import { Image } from 'react-native-elements';
import { ServiceCard as ServiceCardModel } from '../data/services/types';

interface ServiceCardProps {
  cardData: ServiceCardModel,
  onPress: Function
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ cardData, onPress }) => {

  return (
    <CustomCard containerStyle={styles.service} key={cardData.name}>
      <TouchableScale onPress={() => onPress()}>
        <View style={styles.imageContainer}>
          <Image
            PlaceholderContent={
              <View style={styles.cardImgPlaceholderContent}>
                <ActivityIndicator color={theme.colors?.primary} />
              </View>
            }
            style={styles.image}
            source={cardData.imageUrl}
          />
        </View>
        <NormalText numberOfLines={2} style={{ textAlign: 'center', padding: 5, fontSize: 15 }}>{cardData.title}</NormalText>
      </TouchableScale>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  service: {
    flexBasis: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 170,
    margin: 0,
    padding: 0,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100
  },
  cardImgPlaceholderContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardTitle: {

  }
});