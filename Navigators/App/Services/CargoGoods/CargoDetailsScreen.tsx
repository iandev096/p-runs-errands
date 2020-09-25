import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { cargoDetailsFormControls } from '../../../../constants/form/cargoDetails/data';
import { CargoDetailsFormData, EsQUANTITY } from '../../../../constants/form/cargoDetails/types';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { CargoGoodsNavigationProp } from './types';
import { CargoGoodsContext } from '../../../../store/contexts/Services/CargoGoods/CargoGoodsContext';
import { Loader } from '../../../../UIComponents/Loader';
import { Alert } from 'react-native';

interface CargoDetailsScreenProps {
  navigation: CargoGoodsNavigationProp<'CargoDetails'>;
}

const schema = yup.object().shape({
  cargoNature: yup.string().required(),
  estimatedQuatity: yup.string().required(),
  from: yup.object().typeError('Choose a location').shape({ lat: yup.number().required(), lng: yup.number().required() }),
  to: yup.object().typeError('Choose a location').shape({ lat: yup.number().required(), lng: yup.number().required() })
});

const ctrlNames = cargoDetailsFormControls.map(fc => fc.name);
export const CargoDetailsScreen: React.FC<CargoDetailsScreenProps> = ({ navigation }) => {
  const { dispatch, cargoDetails } = useContext(CargoGoodsContext);
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<CargoDetailsFormData>({
    defaultValues: {
      cargoNature: cargoDetails?.cargoNature ?? '',
      estimatedQuatity: cargoDetails?.estimatedQuatity ?? EsQUANTITY.less100,
      from: cargoDetails?.from ?? null,
      to: cargoDetails?.to ?? null
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

  
  const submitHandler = async (f: CargoDetailsFormData) => {
    try {
      setIsLoading(true);
      await dispatch({
        type: 'POST_CARGO_GOODS',
        payload: {
          cargoNature: f.cargoNature,
          estimatedQuatity: f.estimatedQuatity,
          to: f.to,
          from: f.from,
        }
      });
      setIsLoading(false);
      Alert.alert('Success', 'We have received your details', [{
        text: 'OK',
        onPress: () => navigation.navigate('Tabs')
      }])
    } catch (err) {
      Alert.alert('Error', 'Error posting your cargo details. Please try again', [
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

  const renderedControls = RenderFormControls<CargoDetailsFormData>({
    control,
    controls: cargoDetailsFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <>
      <Loader theme={theme} isLoading={isLoading} transparent={true} />
      <FormScreen
        heading={'CARGO DETAILS'}
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
