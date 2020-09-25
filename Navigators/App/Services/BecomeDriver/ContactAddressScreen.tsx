import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { contactAddressFormControls } from '../../../../constants/form/becomeDriver/contactAddress/data';
import { ContactAddressFormData } from '../../../../constants/form/becomeDriver/contactAddress/type';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { BecomeDriverNavigationProp } from './types';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { BecomeDriverContext } from '../../../../store/contexts/Services/BecomeDriver/BecomeDriverContext';

interface ContactAddressScreenProps {
  navigation: BecomeDriverNavigationProp<'ContactAddress'>;
}

const schema = yup.object().shape({
  address1: yup.string().required(),
  address2: yup.string(),
  contactNumber: yup.string(),
  currentLocation:  yup.object().typeError('Choose a location').shape({ lat: yup.number().required(), lng: yup.number().required() }),
  guarantorAddress: yup.string(),
  guarantorContactNumber: yup.string(),
  nameOfGuarantor: yup.string(),
});

const ctrlNames = contactAddressFormControls.map(fc => fc.name);
export const ContactAddressScreen: React.FC<ContactAddressScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<ContactAddressFormData>({
    defaultValues: {
      address1: '',
      address2: '',
      contactNumber: '',
      currentLocation: null,
      guarantorAddress: '',
      guarantorContactNumber: '',
      nameOfGuarantor: '',
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

  const nextHandler = (f: ContactAddressFormData) => {
    dispatch({ type: 'SET_CONTACT_ADDRESS', payload: f});
    navigation.navigate('LicenseInfo');
  }

  const renderedControls = RenderFormControls<ContactAddressFormData>({
    control,
    controls: contactAddressFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <FormScreen
      heading='ENTER CONTACT DETAILS'
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
