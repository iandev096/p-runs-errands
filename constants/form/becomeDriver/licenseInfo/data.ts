import { formControl } from "../../types";
import { LicenseInfoFormData } from './type'

export const licenseInfoFormControls: formControl<keyof LicenseInfoFormData>[] = [
  {
    name: 'nameOnLicense',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Name on License',
      multiline: false,
    },
    icon: {
      name: 'ios-person',
      type: 'ionicon'
    }
  },
  {
    name: 'year',
    controlType: 'TextInput',
    input: {
      placeholder: '2010',
      label: 'License Year',
    },
    keyboardType: 'number-pad',
    icon: {
      name: 'ios-calendar', type: 'ionicon'
    }
  },
  {
    name: 'drivingSince',
    controlType: 'TextInput',
    input: {
      placeholder: '2010',
      label: 'Driving Since',
    },
    keyboardType: 'number-pad',
    icon: {
      name: 'ios-calendar',
      type: 'ionicon'
    }
  },
  {
    name: 'imageOfLicense',
    controlType: 'ImageInput',
    label: 'Image of License',
    image: { base64: '', uri: '' }
  },
];