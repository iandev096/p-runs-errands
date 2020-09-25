import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewProps } from 'react-native';
import { CustomCard } from './CustomCard';
import { NormalText } from './NormalText';
import { CardProps, Theme, Icon, IconProps } from 'react-native-elements';
import { TextOverlaidImage } from './TextOverlaidImage';

interface VehicleCardProps extends CardProps {
  onPress: Function;
  theme: Theme,
  title: string,
  badges?: string[],
  categories?: string[],
  isAvailable: boolean,
  thumbnailUrl: any,
  size?: 'big' | 'small',
  minPrice: number,
}

interface CardBodyIconProps extends IconProps {
  theme: Theme
}

function CardBodyIcon({ theme, ...props }: CardBodyIconProps) {
  return <Icon color={theme.colors?.success} size={14} {...props} />
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ badges, thumbnailUrl, size, title, categories, isAvailable, onPress, minPrice, containerStyle, theme, ...props }) => {
  const [computedStyle, setComputedStyle] = useState<StyleProp<ViewProps>>();
  
  useEffect(() => {
    setComputedStyle(StyleSheet.compose({
      width: size === 'small' ? 280 : '100%',
      margin: 0,
      padding: 0,
      marginRight: 20
    }, containerStyle))
  }, [containerStyle, size]);
  

  return (
    <CustomCard containerStyle={computedStyle} {...props}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress()}>
        <TextOverlaidImage
          placeholderStyle={{ width: size === 'small' ? 280 : '100%', backgroundColor: theme.colors?.grey3 }}
          style={{
            height: size === 'small' ? 140 : 200
          }}
          source={{uri: thumbnailUrl}}
          theme={theme}
          imageText={{
            show: !isAvailable,
            text: 'NOT AVAILABLE'
          }}
          badges={badges}
        />
       
        <View style={styles.cardBody}>
          <NormalText numberOfLines={1} style={{ ...styles.cardTitle, color: theme.colors?.grey1 }} >
            {title}
          </NormalText>
          <NormalText numberOfLines={1} style={{ ...styles.cuisine, color: theme.colors?.grey3 }}>
            {categories?.join(' • ')}
          </NormalText>
          
          {minPrice && <NormalText style={styles.minPrice}>
            <NormalText style={styles.durationUnit}>MIN</NormalText>GH₵{minPrice}
          </NormalText>}
        </View>
      </TouchableOpacity>
    </CustomCard>
  );
}

const styles = StyleSheet.create({
  cardImgGroup: {

  },
  cardImg: {
    width: '100%',
    height: 200,
    borderRadius: 4
  },
  cardImgOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4
  },
  cardImgPlaceholderContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImgTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImgText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  },
  cardBadges: {
    position: 'absolute',
    top: 15,
    right: 0,
    alignItems: 'flex-end'
  },
  cardBadgeText: {
    color: 'rgba(255,255,255, 0.9)',
    elevation: 4,
    textAlign: 'right',
    paddingHorizontal: 10,
    textTransform: 'uppercase',
    paddingVertical: 1,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 10
  },
  cardBody: {
    paddingVertical: 18,
    paddingHorizontal: 10
  },
  cardTitle: {
    fontSize: 20
  },
  cuisine: {
    fontSize: 14,
    marginVertical: 5
  },
  minPrice: {
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 18,
    position: 'absolute',
    top: 0,
    right: 10,
    marginTop: -18,
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontWeight: 'bold'
  },
  durationUnit: {
    fontSize: 12,
    fontWeight: 'normal'
  }
});
