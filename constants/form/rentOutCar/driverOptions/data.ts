import { formControl } from "../../types";
import { DriverOptionsFormData, preferredOptions } from "./types";

export const driverOptionsFormControls: formControl<keyof DriverOptionsFormData>[] = [
  {
    name: 'preferredOptions',
    controlType: 'PickerInput',
    label: 'Choose Preferred Drive Options',
    items: [
      { label: 'Self drive' as preferredOptions, value: 'Self drive' as preferredOptions },
      { label: 'With drive' as preferredOptions, value: 'With drive' as preferredOptions },
      { label: 'Both' as preferredOptions, value: 'Both' as preferredOptions },
    ]
  },
  {
    name: 'expectedRentPerDay',
    controlType: 'TextInput',
    keyboardType: 'number-pad',
    input: {
      placeholder: 'e.g 1000',
      label: 'Expected Rent Price / Day (GH₵)'
    },
    icon: {
      name: 'ios-cash', type: 'ionicon',
    }
  },
  {
    name: 'expectedRentPerHalf',
    controlType: 'TextInput',
    keyboardType: 'number-pad',
    input: {
      placeholder: 'e.g 100',
      label: 'Expected Rent Price / Day (GH₵)'
    },
    icon: {
      name: 'ios-cash', type: 'ionicon',
    }
  }
];
