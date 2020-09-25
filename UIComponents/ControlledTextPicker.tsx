import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Theme } from 'react-native-elements';
import { CustomTextPicker } from './CustomTextPicker';
import { pickerItem } from '../constants/form/types';

interface ControlledTextPickerProps {
  items: pickerItem[],
  label: string;
  control: Control,
  name: string,
  error?: any,
  theme: Theme,
}

export const ControlledTextPicker: React.FC<ControlledTextPickerProps> = ({ label, items, name, control, error, theme }) => {

  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <CustomTextPicker
          hookFormProps={props}
          theme={theme}
          items={items}
          label={label}
          errorMessage={error}
        />
      )}
    />
  );
};
