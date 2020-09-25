import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Theme } from 'react-native-elements';
import { checkItem } from '../constants/form/types';

interface CustomCheckInputProps {
  item: checkItem,
  label: string,
  errorMessage?: string,
  theme: Theme,
  onValueChanged: (item: checkItem) => any
}

export const CustomCheckInput: React.FC<CustomCheckInputProps> = ({ item, label, onValueChanged }) => {
  const [checkItemState, setCheckItemState] = useState(item);

  const toggleCheckItemState = () => {
    setCheckItemState((prev) => ({ ...prev, selected: !prev.selected}))
  };

  useEffect(() => {
    onValueChanged(checkItemState);
  }, [checkItemState]);

  return (
    <CheckBox
      key={checkItemState.label}
      title={checkItemState?.label}
      checked={checkItemState?.selected}
      onPress={() => toggleCheckItemState()}
    />

  );
};

const styles = StyleSheet.create({});