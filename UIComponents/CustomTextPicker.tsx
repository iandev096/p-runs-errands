import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from 'react-native-elements';
import { pickerItem } from '../constants/form/rentOutCar/vehicleDetails/types';
import { Picker } from '@react-native-community/picker';

interface CustomTextPickerProps {
  hookFormProps: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: any;
  },
  theme: Theme,
  items: pickerItem[],
  label: string,
  errorMessage?: string,
}

export const CustomTextPicker: React.FC<CustomTextPickerProps> = ({ hookFormProps, errorMessage, items, label, theme }) => {

  return (
    <View style={{
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: 9,
      marginVertical: 10,
    }}>
      <Text style={{
        fontWeight: 'bold',
        color: theme.colors?.grey3,
        fontSize: 16,
        paddingLeft: 10
      }}>{label}</Text>
      <Picker
        {...hookFormProps}
        mode='dialog'
        selectedValue={hookFormProps.value}
        style={{
          width: '100%',
          marginLeft: 3
        }}
        onValueChange={(itemValue, itemIndex) => hookFormProps.onChange(itemValue)}>
        {items.map(item => (
          <Picker.Item key={item.label} label={item.label} value={item.value} />
        ))}
      </Picker>
      {errorMessage && <Text style={{ color: theme.colors?.error, fontSize: 12 }}>{errorMessage}</Text>}
    </View>
  );
};
