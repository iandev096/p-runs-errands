import { CATEGORIES, gearbox, fuel } from "../../../../data/vehicles/types";
import { VehicleDetailFormData } from "./types";
import { formControl } from "../../types";

export const vehicleDetailsFormControls: formControl<keyof VehicleDetailFormData>[] = [
  {
    name: 'make',
    controlType: 'TextInput',
    input: {
      placeholder: 'e.g Toyota',
      label: 'Make'
    },
    icon: {
      type: 'ionicon',
      name: 'ios-car'
    }
  },
  {
    name: 'model',
    controlType: 'TextInput',
    input: {
      placeholder: 'e.g Camry',
      label: 'Model'
    },
    icon: {
      type: 'ionicon',
      name: 'logo-model-s'
    }
  },
  {
    name: 'fuelType',
    label: 'Fuel Type',
    controlType: 'PickerInput',
    items: [
      { label: 'Diesel' as fuel, value: 'Diesel' as fuel },
      { label: 'Gasoline' as fuel, value: 'Gasoline' as fuel },
      { label: 'Petrol' as fuel, value: 'Petrol' as fuel },
      { label: 'N/A' as fuel, value: 'N/A' as fuel },
    ]
  },
  {
    name: 'gearbox',
    label: 'Gearbox',
    controlType: 'PickerInput',
    items: [
      { label: 'Automatic' as gearbox, value: 'Automatic' as gearbox },
      { label: 'Hybrid' as gearbox, value: 'Hybrid' as gearbox },
      { label: 'Manual' as gearbox, value: 'Manual' as gearbox },
    ]
  },
  {
    name: 'category',
    label: 'Select Category',
    controlType: 'CheckInput',
    items: [
      { label: CATEGORIES.Business.toString(), selected: false },
      { label: CATEGORIES.Economy.toString(), selected: false },
      { label: CATEGORIES.Minivans.toString(), selected: false },
      { label: CATEGORIES.Pickups.toString(), selected: false },
      { label: CATEGORIES.Trucks.toString(), selected: false },
      { label: CATEGORIES.Vans.toString(), selected: false },
    ]
  },
  {
    name: 'mileage',
    controlType: 'TextInput',
    input: {
      placeholder: 'e.g 3002',
      label: 'Mileage (in miles)'
    },
    icon: {
      type: 'ionicon',
      name: 'ios-speedometer'
    },
    keyboardType: 'number-pad'
  },
  {
    name: 'extColor',
    controlType: 'TextInput',
    input: {
      placeholder: 'e.g Aqua',
      label: 'Exterior Color'
    },
    icon: {
      type: 'ionicon',
      name: 'ios-color-palette'
    }
  },
  {
    name: 'regPlateNumber',
    controlType: 'TextInput',
    keyboardType: 'visible-password',
    input: {
      placeholder: 'e.g GT-1190-20',
      label: 'Registration Plate Number'
    },
    icon: {
      type: 'ionicon',
      name: 'ios-barcode'
    }
  }
]