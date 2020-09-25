import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { CustomTextInput } from './CustomTextInput';
import { Theme, IconProps } from 'react-native-elements';

interface ControlledTextInputProps {
  control: Control,
  name: string,
  error?: any,
  multiline?: boolean;
  theme: Theme,
  inputProps: {
    placeholder: string,
    label: string,
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined;
  },
  iconProps: IconProps,
}


export const ControlledTextInput: React.FC<ControlledTextInputProps> = ({ control, error, name, theme, multiline, inputProps, iconProps }) => {

  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <CustomTextInput
          keyboardType={inputProps.keyboardType}
          placeholder={inputProps.placeholder}
          label={inputProps.label}
          errorMessage={error?.message}
          iconProps={iconProps}
          theme={theme}
          reactHookProps={props}
          onChangeText={(value) => props.onChange(value)}
          containerStyle={{
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 9,
            marginVertical: 10
          }}
          inputContainerStyle={{
            borderBottomWidth: 0.2
          }}
          multiline={multiline}
        />
      )}
    />
  );
};
