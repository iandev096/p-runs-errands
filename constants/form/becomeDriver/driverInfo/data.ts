import { formControl } from "../../types";
import { DriverInfoFormData } from "./type";
import { VEHICLE_TYPE } from "../../../../data/hireDrivers/types";

export const driverInfoFormControls: formControl<keyof DriverInfoFormData>[] = [
  {
    name: 'about',
    controlType: 'TextInput',
    input: {
      placeholder: '',
      label: 'About Yourself',
      multiline: true,
    },
    icon: {
      name: 'ios-create',
      type: 'ionicon'
    }
  },
  {
    name: 'profileImage',
    controlType: 'ImageInput',
    label: 'Profile Image',
    image: { base64: '', uri: '' }
  },
  {
    name: 'skills',
    controlType: 'CheckInput',
    label: 'Skills',
    items: [
      {
        label: 'Trained On First Aid',
        selected: false
      },
      {
        label: 'Familiar With Vehicle Maintainance',
        selected: false
      },
      {
        label: 'Familiar With Tourist Locations Across The City And Country',
        selected: false
      },
      {
        label: 'Familiar With Bars Resturants Across The City And Country',
        selected: false
      },
      {
        label: 'Familiar With Hotels Across The City And Country',
        selected: false
      }
    ]
  },
  {
    name: 'vehicleTypes',
    controlType: 'CheckInput',
    label: 'Vehicle Types',
    items: [
      { label: VEHICLE_TYPE.Buses, selected: false },
      { label: VEHICLE_TYPE.Cars, selected: false },
      { label: VEHICLE_TYPE.LongVehicle, selected: false },
      { label: VEHICLE_TYPE.Trucks, selected: false },
    ]
  },
];
