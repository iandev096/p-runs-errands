import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { driverInfoFormControls } from '../../../../constants/form/becomeDriver/driverInfo/data';
import { DriverInfoFormData } from '../../../../constants/form/becomeDriver/driverInfo/type';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { BecomeDriverNavigationProp } from './types';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { BecomeDriverContext } from '../../../../store/contexts/Services/BecomeDriver/BecomeDriverContext';

interface DriverInfoScreenProps {
  navigation: BecomeDriverNavigationProp<'DriverInfo'>;
}

const schema = yup.object().shape({
  about: yup.string().required(),
  profileImage: yup.object().shape({
    uri: yup.string().required(),
    base64: yup.string()
  }),
  skills: yup.array(),
  vehicleTypes: yup.array(),
});

const ctrlNames = driverInfoFormControls.map(fc => fc.name);
export const DriverInfoScreen: React.FC<DriverInfoScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<DriverInfoFormData>({
    defaultValues: {
      about: '',
      profileImage: { uri: '' },
      skills: [],
      vehicleTypes: []
    },
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(BecomeDriverContext);
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

  const nextHandler = (f: DriverInfoFormData) => {
    dispatch({ type: 'SET_DRIVER_INFO', payload: f})
    navigation.navigate('ContactAddress');
  }

  const renderedControls = RenderFormControls<DriverInfoFormData>({
    control,
    controls: driverInfoFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <FormScreen
      heading='ENTER DRIVER INFO'
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
