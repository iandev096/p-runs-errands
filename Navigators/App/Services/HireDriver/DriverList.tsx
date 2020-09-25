import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Driver } from '../../../../data/hireDrivers/types';
import { Theme } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { DriverCard } from '../../../../UIComponents/DriverCard';
import { DriverStateProp } from '../../../../store/contexts/Services/HireDriver/types';

interface DriverListProps {
  drivers: DriverStateProp[]
  theme: Theme,
  onRefresh?: (() => void) | null | undefined,
  refreshing?: boolean,
  navToDetail: (driverId: string) => any
}

export const DriverList: React.FC<DriverListProps> = ({ drivers, theme, navToDetail, onRefresh, refreshing }) => {

  const getYearsOfExpBadge = (year: number) => {
    const years = new Date().getFullYear() - year;
    if (years > 0) return [years + 'yrs EXP'];
  }

  return (
    <FlatList
    data={drivers}
    keyExtractor={item => item.docId}
    showsVerticalScrollIndicator={false}
    onRefresh={onRefresh}
    refreshing={refreshing}
    contentContainerStyle={{ minHeight: Dimensions.get('window').height, paddingBottom: 50  }}
    renderItem={({ item }) => (
      <View key={item.docId} style={{ paddingVertical: 5 }}>
        <DriverCard
          isAvailable={item.isAvailable}
          vehicleTypes={item.detail.typesOfVehicles && Array.from(item.detail.typesOfVehicles)}
          thumbnailUrl={item.detail.imageUrl}
          name={item.detail.firstName + ' ' + item.detail.lastName}
          theme={theme}
          badges={getYearsOfExpBadge(item.detail.drivingSince)}
          onPress={() => navToDetail(item.docId)}
        />
      </View>
    )}
  />
  );
};

const styles = StyleSheet.create({});