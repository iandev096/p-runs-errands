import { ImagePickerImg } from "../../UIComponents/CustomImagePickerInput";

export type pickerItem = { label: string, value: string }
export type checkItem = { label: string, selected: boolean }

type controlType = 'TextInput' | 'PickerInput' | 'CheckInput' | 'ImageInput' | 'LocationInput';

export type formControl<T> =  {
  name: T;
  controlType: controlType,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined,
  input?: {
    placeholder: string;
    label: string;
    multiline?: boolean;
  };
  icon?: {
    type: string;
    name: string;
  };
  
  label?: string,
  items?: pickerItem[] | checkItem[],

  image?: ImagePickerImg
  
  location?: {lat: number, lng: number}
}
//   |
// {
//   name: string;
//   label: string,
//   items: pickerItem[],
//   controlType: 'PickerInput',
//   keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined,

// }
//   |
// {
//   name: string;
//   label: string,
//   items: checkItem[],
//   controlType: 'CheckInput',
//   keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined,

// }
//   |
// {
//   name: string;
//   label: string,
//   value: any,
//   controlType: controlType,
//   keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined,

// };
