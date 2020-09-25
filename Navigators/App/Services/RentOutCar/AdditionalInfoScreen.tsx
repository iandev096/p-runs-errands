import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { additionalInfoFormControls } from '../../../../constants/form/rentOutCar/additionalInfo/data';
import { AdditionalInfoFormData } from '../../../../constants/form/rentOutCar/additionalInfo/types';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { RentOutCarNavigationProp } from './types';
import { uploadUserServiceImage, getBlobFromUri } from '../../../../util/firebase/storage';
import { SERVICE_NAME } from '../../../../data/services/data';
import { objType } from '../../../../constants/firebase/storage';
import { Alert } from 'react-native';
import { Loader } from '../../../../UIComponents/Loader';
import { RentOutCarContext } from '../../../../store/contexts/Services/RentOutCar/RentOutCarContext';

interface AdditionalInfoScreenProps {
  navigation: RentOutCarNavigationProp<'AdditionalInfo'>;
}

const schema = yup.object().shape({
  additionalInfo: yup.array(),
  description: yup.string().required('Required field'),
  vehicleImage: yup.object().shape({
    uri: yup.string().required(),
    base64: yup.string()
  })
});

const ctrlNames = additionalInfoFormControls.map(fc => fc.name);
export const AdditionalInfoScreen: React.FC<AdditionalInfoScreenProps> = ({ navigation }) => {
  const { dispatch, driverOptions, vehicleDetails, additionalInfo } = useContext(RentOutCarContext);
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<AdditionalInfoFormData>({
    defaultValues: {
      additionalInfo: additionalInfo?.additionalInfo ?? [],
      description: additionalInfo?.description ?? '',
      vehicleImage: additionalInfo?.vehicleImage ?? { uri: '' }
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

  const submitHandler = async (f: AdditionalInfoFormData) => {
    dispatch({ type: 'SET_ADDITIONAL_INFO', payload: f });
    try {
      setIsLoading(true);

     const {downloadURL} = await uploadUserServiceImage(
        SERVICE_NAME.RentOutCar,
        objType.Vehicle,
        f.vehicleImage.uri
      );

      if (vehicleDetails && driverOptions) {
        await dispatch({
          type: 'POST_RENT_OUT_CAR', payload: {
            expectedRentPerDay: driverOptions.expectedRentPerDay,
            expectedRentPerHalf: driverOptions.expectedRentPerHalf,
            preferredOptions: driverOptions.preferredOptions,

            make: vehicleDetails.make,
            model: vehicleDetails.model,
            fuelType: vehicleDetails.fuelType,
            gearbox: vehicleDetails.gearbox,
            category: vehicleDetails.category,
            mileage: vehicleDetails.mileage,
            extColor: vehicleDetails.extColor,
            regPlateNumber: vehicleDetails.regPlateNumber,

            additionalInfo: f.additionalInfo,
            description: f.description,
            vehicleImage: { uri: downloadURL }
          }
        });
      } else {
        throw new Error('Car details not completed');
      }

      setIsLoading(false);
      Alert.alert('Success', 'We have received your details', [{
        text: 'OK',
        onPress: () => navigation.navigate('Tabs')
      }])

    } catch (err) {
      setIsLoading(false);
      Alert.alert('Error', 'Error posting car. Please try again', [
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

  const renderedControls = RenderFormControls<AdditionalInfoFormData>({
    control,
    controls: additionalInfoFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <>
      <Loader theme={theme} isLoading={isLoading} transparent={true} />
      <FormScreen
        heading='ENTER ADDITIONAL INFO'
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
        isLoading={isLoading}
      >
        {renderedControls}
      </FormScreen>
    </>
  );
};
