import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { CustomImagePickerInput } from './CustomImagePickerInput';
import { Theme } from 'react-native-elements';

interface ControlledImagePickerInputProps {
  label: string,
  imageUrl?: string;
  disabled?: string;
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

export const ControlledImagePickerInput: React.FC<ControlledImagePickerInputProps> = ({ label, imageUrl, control, name, error, setValue, clearErrors, theme }) => {
  const [err, setErr] = useState();

  useEffect(() => {
    if (error?.message) setErr(error?.message);
    if (error?.uri?.message) setErr(error?.uri?.message);
  }, [error])

  useEffect(() => {
    const initialImageUrl = imageUrl;
    if (imageUrl) setValue(name, { uri: initialImageUrl });
  }, [imageUrl, name]);

  return (
    <Controller
      name={name}
      control={control}
      render={props => (
        <CustomImagePickerInput {...props}
          label={label}
          theme={theme}
          onValueChanged={(image) => {
            setValue(name, image);
            clearErrors(name);
          }}
          errorMessage={err}
        />
      )}
    />
  );
};
