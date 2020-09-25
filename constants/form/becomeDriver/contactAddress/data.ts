import { formControl } from "../../types";
import { ContactAddressFormData } from "./type";

export const contactAddressFormControls: formControl<keyof ContactAddressFormData>[] = [
  {
    name: 'currentLocation',
    label: 'Current Location',
    controlType: 'LocationInput',
    location: {
      lat: 0,
      lng: 0
    }
  },
  {
    name: 'address1',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Primary Address',
      multiline: true,
    },
    icon: {
      name: 'ios-map',
      type: 'ionicon'
    }
  },
  {
    name: 'address2',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Secondary Address',
      multiline: true,
    },
    icon: {
      name: 'ios-map',
      type: 'ionicon'
    }
  },
  {
    name: 'guarantorContactNumber',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Guarantor Contact Number',
    },
    keyboardType: 'phone-pad',
    icon: {
      name: 'ios-phone-portrait',
      type: 'ionicon'
    }
  },
  {
    name: 'nameOfGuarantor',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Name of Guarantor',
    },
    icon: {
      name: 'ios-contact',
      type: 'ionicon'
    }
  },
  {
    name: 'guarantorAddress',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Guarantor Address',
      multiline: true,
    },
    icon: {
      name: 'ios-map',
      type: 'ionicon'
    }
  },
];