import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { errandFormControls } from '../../../../constants/form/errandDelivery/errand/data';
import { ErrandFormData } from '../../../../constants/form/errandDelivery/errand/type';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { ErrandDeliveryNavigationProp } from './types';
import { ErrandDeliveryContext } from '../../../../store/contexts/Services/ErrandDelivery/ErrandDeliveryContext';
import { Alert } from 'react-native';
import { Loader } from '../../../../UIComponents/Loader';

interface ErrandScreenProps {
  navigation: ErrandDeliveryNavigationProp<'Errand'>;
}

const schema = yup.object().shape({
  contactNumber: yup.string().required(),
  from: yup.object().typeError('Choose a location').shape({ lat: yup.number().required(), lng: yup.number().required() }),
  to: yup.object().typeError('Choose a location').shape({ lat: yup.number().required(), lng: yup.number().required() }),
  instructions: yup.string().required()
});

const ctrlNames = errandFormControls.map(fc => fc.name);
export const ErrandScreen: React.FC<ErrandScreenProps> = ({ navigation }) => {
  const { dispatch, errand } = useContext(ErrandDeliveryContext);
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<ErrandFormData>({
    defaultValues: {
      contactNumber: errand?.contactNumber ?? '',
      from: errand?.from ?? null,
      to: errand?.to ?? null,
      instructions: errand?.instructions ?? ''
    },
    resolver: yupResolver(schema)
  });

  const [isLoading, setIsLoading] = useState(false);
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


  const submitHandler = async (f: ErrandFormData) => {
    try {
      setIsLoading(true);
      await dispatch({
        type: 'POST_ERRAND',
        payload: {
          contactNumber: f.contactNumber,
          from: f.from,
          to: f.to,
          instructions: f.instructions
        }
      });
      setIsLoading(false);
      Alert.alert('Success', 'We have received your details', [{
        text: 'OK',
        onPress: () => navigation.navigate('Tabs')
      }])
    } catch (err) {
      Alert.alert('Error', 'Error posting Errand. Please try again', [
        {
          text: 'Go HOME',
          onPress: () => navigation.navigate('Tabs')
        }, {
          style: 'default',
          text: 'Try Again'
        }
      ]);
    }
  }

  const renderedControls = RenderFormControls<ErrandFormData>({
    control,
    controls: errandFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <>
      <Loader theme={theme} isLoading={isLoading} transparent={true} />
      <FormScreen
        heading='Errand Details'
        theme={theme}
        leftFooterButton={{
          title: 'BACK',
          onPress: () => { navigation.goBack() }
        }}
        rightFooterButton={{
          title: 'SUBMIT',
          onPress: handleSubmit(submitHandler),
          disabled: !formValid
        }}
      >
        {renderedControls}
      </FormScreen>
    </>
  );
};
