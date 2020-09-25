import { formControl } from "../../types";
import { DeliveryFormData } from "./type";

export const deliveryFormControls: formControl<keyof DeliveryFormData>[] = [
  {
    name: 'instructions',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Instructions',
      multiline: true,
    },
    keyboardType: 'default',
    icon: {
      name: 'ios-list-box',
      type: 'ionicon'
    }
  },
  {
    name: 'contactNumber',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Contact Number',
    },
    keyboardType: 'phone-pad',
    icon: {
      name: 'ios-contact',
      type: 'ionicon'
    }
  },
  {
    name: 'from',
    label: 'From',
    controlType: 'LocationInput',
    location: {
      lat: 0,
      lng: 0
    }
  },
  {
    name: 'to',
    label: 'To',
    controlType: 'LocationInput',
    location: {
      lat: 0,
      lng: 0
    }
  },
];
