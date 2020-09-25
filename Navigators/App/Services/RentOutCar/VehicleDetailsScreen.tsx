import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { RentOutCarNavigationProp } from './types';
import { vehicleDetailsFormControls } from '../../../../constants/form/rentOutCar/vehicleDetails/data';
import { VehicleDetailFormData } from '../../../../constants/form/rentOutCar/vehicleDetails/types';
import { RentOutCarContext } from '../../../../store/contexts/Services/RentOutCar/RentOutCarContext';

interface VehicleDetailsScreenProps {
  navigation: RentOutCarNavigationProp<'VehicleDetails'>
}

const schema = yup.object().shape({
  make: yup.string().required('Required field'),
  model: yup.string().required('Required field'),
  fuelType: yup.string().required(),
  gearbox: yup.string().required(),
  category: yup.array().min(1).of(yup.string()).required(),
  mileage: yup.number().min(1, 'Enter a valid number').required(),
  extColor: yup.string().required(),
  regPlateNumber: yup.string().required(),
})

const ctrlNames = vehicleDetailsFormControls.map(fc => fc.name);
export const VehicleDetailsScreen: React.FC<VehicleDetailsScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<VehicleDetailFormData>({
    defaultValues: {
      make: '',
      model: '',
      fuelType: 'Petrol',
      gearbox: 'Manual',
      category: [],
      mileage: 0,
      extColor: '',
      regPlateNumber: ''
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

  const nextHandler = (f: VehicleDetailFormData) => {
    dispatch({ type: 'SET_VEHICLE_DETAILS', payload: f });
    navigation.navigate('DriverOptions');
  }

  const renderedControls = RenderFormControls<VehicleDetailFormData>({
    control,
    controls: vehicleDetailsFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <FormScreen
    heading='ENTER VEHICLE DETAILS'
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
