import { formControl } from "../../types";
import { AdditionalInfoFormData } from "./types";
import { ADDITIONAL_INFO } from "../../../../data/vehicles/types";

export const additionalInfoFormControls: formControl<keyof AdditionalInfoFormData>[] = [
  {
    name: 'description',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'Description',
      multiline: true
    },
    icon: {
      name: 'ios-book',
      type: 'ionicon'
    }
  },
  {
    name: 'vehicleImage',
    controlType: 'ImageInput',
    label: 'Vehicle Image',
    image: { base64: '', uri: '' }
  },
  {
    name: 'additionalInfo',
    controlType: 'CheckInput',
    label: 'Additional Info',
    items: [
      { label: ADDITIONAL_INFO.ABS.toString(), selected: false },
      { label: ADDITIONAL_INFO.AirBag.toString(), selected: false },
      { label: ADDITIONAL_INFO.AirConditioning.toString(), selected: false },
      { label: ADDITIONAL_INFO.AudioSystem.toString(), selected: false },
      { label: ADDITIONAL_INFO.CentralLocking.toString(), selected: false },
      { label: ADDITIONAL_INFO.CruiseControl.toString(), selected: false },
      { label: ADDITIONAL_INFO.ElectricWindows.toString(), selected: false },
      { label: ADDITIONAL_INFO.FourWheel.toString(), selected: false },
      { label: ADDITIONAL_INFO.SelfDrive.toString(), selected: false },
    ]
  }
]