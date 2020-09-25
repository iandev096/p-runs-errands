import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Theme } from 'react-native-elements';
import { Control, Controller } from 'react-hook-form';
import { CustomCheckInput } from './CustomCheckInput';
import { checkItem } from '../constants/form/types';

interface ControlledCheckGroupProps {
  items: checkItem[],
  label: string,
  control: Control,
  name: string,
  error?: any,
  setValue: (name: string, value?: {} | undefined, options?: Partial<{
    shouldValidate: boolean;
    shouldDirty: boolean;
  }> | undefined) => void,
  clearErrors: (name?: any) => void,
  theme: Theme
}

export const ControlledCheckGroup: React.FC<ControlledCheckGroupProps> = ({ label, theme, items, setValue, clearErrors, name, control, error }) => {
  useEffect(() => {
    const initialValues = items
      .filter(item => item.selected)
      .map(item => item.label);
    setValue(name, initialValues);
  }, [items]);

  return (
    <Controller
      name={name}
      control={control}
      render={props => (
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 9,
          marginVertical: 10,
          paddingBottom: 10
        }}>
          <Text style={{
            fontWeight: 'bold',
            color: theme.colors?.grey3,
            fontSize: 16,
            paddingLeft: 10,
            marginBottom: 10
          }}>{label}</Text>
          {items.map(item => (
            <CustomCheckInput
              {...props}
              key={item.label}
              label={label}
              item={item}
              theme={theme}
              onValueChanged={(value) => {
                let checkGroupVal = props.value as string[];
                if (value.selected) {
                  checkGroupVal.push(value.label);
                  clearErrors(name);
                } else {
                  checkGroupVal = checkGroupVal.filter(
                    val => val.toString().toLowerCase() !== value.label.toString().toLowerCase()
                  );
                }
                
                setValue(name, checkGroupVal);
              }}
            />
          ))}
          {error?.message && <Text style={{ color: theme.colors?.error, fontSize: 12 }}>{error?.message}</Text>}
        </View>
      )}
    />
  );
};
