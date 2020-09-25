import React from 'react';
import { Theme, Input, InputProps, IconProps, Icon } from 'react-native-elements';

export interface CustomTextInputProps extends InputProps {
  theme: Theme,
  iconProps: IconProps,
  reactHookProps?: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: any;
  },
  multiline?: boolean
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({  onChangeText, placeholder, label, errorMessage, iconProps, theme, multiline, reactHookProps, ...props }) => {

  return (
    <Input
      {...props}
      placeholder={placeholder}
      onChangeText={onChangeText}
      errorMessage={errorMessage}
      multiline={multiline}
      containerStyle={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 9,
        marginVertical: 10
      }}
      inputContainerStyle={{
        borderBottomWidth: 0.2,
        borderBottomColor: theme.colors?.grey4
      }}
      label={label}
      leftIcon={
        <Icon
          {...iconProps}
          size={24}
          color={theme.colors?.grey2}
        />
      }
    />
  );
};

