import React, { useEffect } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Theme } from 'react-native-elements';
import { LocationInput } from './LocationInput';
import { View } from 'react-native';

interface ControlledLocationInputProps {
  label: string,
  location?: { lat: number, lng: number };
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

export const ControlledLocationInput: React.FC<ControlledLocationInputProps> = ({ clearErrors, control, label, location, error, theme, setValue, name }) => {
  
  useEffect(() => {
    const initialLocation = location;
    if (initialLocation && initialLocation.lat !== 0 && initialLocation.lng !== 0) setValue(name, location);
  }, [location, name]);

  return (
    <Controller
      name={name}
      control={control}
      render={props => (
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 9,
          marginVertical: 10
        }}>
          <LocationInput
            {...props}
            theme={theme}
            label={label}
            errorMessage={error?.message}
            onLocationChange={({ lat, lng }) => {
              setValue(name, { lat, lng });
              clearErrors(name);
            }}
          />
        </View>
      )}
    />
  );
};
