import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ThemeContext } from 'react-native-elements';
import { licenseInfoFormControls } from '../../../../constants/form/becomeDriver/licenseInfo/data';
import { LicenseInfoFormData } from '../../../../constants/form/becomeDriver/licenseInfo/type';
import { FormScreen } from '../../../../UIComponents/FormScreen';
import { BecomeDriverNavigationProp } from './types';
import { RenderFormControls } from '../../../../util/form/RenderFormControls';
import { BecomeDriverContext } from '../../../../store/contexts/Services/BecomeDriver/BecomeDriverContext';
import { uploadUserServiceImage } from '../../../../util/firebase/storage';
import { SERVICE_NAME } from '../../../../data/services/data';
import { objType } from '../../../../constants/firebase/storage';
import { Alert } from 'react-native';
import { Loader } from '../../../../UIComponents/Loader';
import { AccountContext } from '../../../../store/contexts/Account/AccountContext';

interface LicenseInfoScreenProps {
  navigation: BecomeDriverNavigationProp<'LicenseInfo'>;
}

const schema = yup.object().shape({
  nameOnLicense: yup.string().required(),
  year: yup.number().typeError('Enter an appropriate value').moreThan(1900).lessThan(
    new Date().getFullYear()
  ),

  drivingSince: yup.number().typeError('Enter an appropriate value').moreThan(1900).lessThan(
    new Date().getFullYear() + 1
  ),

  imageOfLicense: yup.object().shape({
    uri: yup.string().required(),
    base64: yup.string()
  }),
});

const ctrlNames = licenseInfoFormControls.map(fc => fc.name);
export const LicenseInfoScreen: React.FC<LicenseInfoScreenProps> = ({ navigation }) => {
  const { dispatch, licenseInfo, driverInfo, contactAddress } = useContext(BecomeDriverContext);
  const { contactDetails } = useContext(AccountContext);
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<LicenseInfoFormData>({
    defaultValues: {
      drivingSince: licenseInfo?.drivingSince ?? 0,
      imageOfLicense: licenseInfo?.imageOfLicense ?? { uri: '' },
      nameOnLicense: licenseInfo?.nameOnLicense ?? '',
      year: licenseInfo?.year ?? 0
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

  const submitHandler = async (f: LicenseInfoFormData) => {
    dispatch({ type: 'SET_LICENSE_INFO', payload: f });
    try {
      setIsLoading(true);
      if (driverInfo && contactAddress && contactDetails) {

        const driverImgRes = await uploadUserServiceImage(
          SERVICE_NAME.BecomeDriver,
          objType.Person,
          driverInfo.profileImage.uri
        );

        const licenseImgRes = await uploadUserServiceImage(
          SERVICE_NAME.BecomeDriver,
          objType.License,
          f.imageOfLicense.uri
        );

        await dispatch({
          type: 'POST_BECOME_DRIVER', payload: {
            about: driverInfo.about,
            profileImage: { uri: driverImgRes.downloadURL },
            skills: driverInfo.skills,
            vehicleTypes: driverInfo.vehicleTypes,

            address1: contactAddress.address1 ,
            address2: contactAddress.address2 ?? '',
            contactNumber: contactAddress.contactNumber ?? '',
            currentLocation: contactAddress.currentLocation,
            guarantorAddress: contactAddress.guarantorAddress  ?? '',
            guarantorContactNumber: contactAddress.guarantorContactNumber ?? '',
            nameOfGuarantor: contactAddress.nameOfGuarantor ?? '',

            drivingSince: f.drivingSince,
            imageOfLicense: { uri: licenseImgRes.downloadURL },
            nameOnLicense: f.nameOnLicense,
            year: f.year,

            firstName: contactDetails.firstName,
            lastName: contactDetails.lastName,
            mobileNumber: contactDetails.mobileNumber,
            email: contactDetails.email
          }
        });
      } else {
        throw new Error('Driver details not completed');
      }

      setIsLoading(false);
      Alert.alert('Success', 'We have received your details', [{
        text: 'OK',
        onPress: () => navigation.navigate('Tabs')
      }])

    } catch (err) {
      setIsLoading(false);
      console.log(err.message)
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

  const renderedControls = RenderFormControls<LicenseInfoFormData>({
    control,
    controls: licenseInfoFormControls,
    errors,
    setValue,
    clearErrors,
    theme
  });

  return (
    <>
      <Loader theme={theme} isLoading={isLoading} transparent={true} />
      <FormScreen
        heading='ENTER LICENSE INFO'
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
