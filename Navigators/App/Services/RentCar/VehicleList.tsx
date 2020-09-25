import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Vehicle } from '../../../../data/vehicles/types';
import { VehicleCard } from '../../../../UIComponents/VehicleCard';
import { Theme } from 'react-native-elements';
import { Car } from '../../../../store/contexts/Services/RentCar/types';

interface VehicleListProps {
  vehicles: Car[],
  navToDetail: (vehicleId: string) => any,
  onRefresh?: (() => void) | null | undefined,
  refreshing?: boolean,
  theme: Theme
}

export const VehicleList: React.FC<VehicleListProps> = ({ vehicles, refreshing, theme, onRefresh, navToDetail }) => {
  return (
    <FlatList
      data={vehicles}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={refreshing}
      contentContainerStyle={{ minHeight: Dimensions.get('window').height, paddingBottom: 50 }}
      keyExtractor={(item) => item.docId}
      renderItem={({ item }) => (
        <View style={{ paddingVertical: 5 }}>
          <VehicleCard
            minPrice={item.detail.pricePerHalf}
            isAvailable={item.isAvailable}
            categories={item.detail.category}
            thumbnailUrl={item.detail.imageUrl}
            title={item.detail.make}
            theme={theme}
            badges={[item.detail.fuelType, item.detail.gearbox]}
            onPress={() => navToDetail(item.docId)}
          />
        </View>
      )}
    />
  );
};
