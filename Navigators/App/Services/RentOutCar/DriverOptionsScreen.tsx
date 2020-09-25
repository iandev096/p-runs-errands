import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { driverOptionsFormControls } from '../../../../constants/form/rentOutCar/driverOptions/data';
import { DriverOptionsFormData } from '../../../../constants/form/rentOutCar/driverOptions/types';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { RentOutCarNavigationProp } from './types';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { RentOutCarContext } from '../../../../store/contexts/Services/RentOutCar/RentOutCarContext';

interface DriverOptionsScreenProps {
  navigation: RentOutCarNavigationProp<'DriverOptions'>;
}

const schema = yup.object().shape({
  expectedRentPerDay: yup.number().min(1, 'Enter a valid number').required(),
  expectedRentPerHalf: yup.number().min(1, 'Enter a valid number').required(),
  preferredOptions: yup.string().required(),
});

const ctrlNames = driverOptionsFormControls.map(fc => fc.name);
export const DriverOptionsScreen: React.FC<DriverOptionsScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<DriverOptionsFormData>({
    defaultValues: {
      expectedRentPerDay: 0,
      expectedRentPerHalf: 0,
      preferredOptions: 'Self drive'
    },
    resolver: yupResolver(schema)
  });

  const { dispatch } = useContext(RentOutCarContext);
  const { theme } = useContext(ThemeContext);
  const [formValid, setFormValid] = useState(false);

  const formValidDependencies = [...ctrlNames.map(name => errors[name])];
  useEffect(() => {
    for (let name of ctrlNames) {
      if (errors[name]) {
        setFormValid(false);
        break
      } else {
        setFormValid(true);
      }
    }
  }, formValidDependencies);

  const nextHandler = (f: DriverOptionsFormData) => {
    dispatch({ type: 'SET_DRIVER_OPTIONS', payload: f })
    navigation.navigate('AdditionalInfo');
  }


  const renderedControls = RenderFormControls<DriverOptionsFormData>({
    control,
    controls: driverOptionsFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <FormScreen
      heading='ENTER DRIVER OPTIONS'
      theme={theme}
      leftFooterButton={{
        title: 'BACK',
        onPress: () => { navigation.goBack() }
      }}
      rightFooterButton={{
        title: 'NEXT',
        onPress: handleSubmit(nextHandler),
        disabled: !formValid
      }}
    >
      {renderedControls}
    </FormScreen>
  );
};
