import { ADDITIONAL_INFO } from "../../../../data/vehicles/types";
import { ImagePickerImg } from "../../../../UIComponents/CustomImagePickerInput";

export interface AdditionalInfoFormData {
  description: string;
  additionalInfo: ADDITIONAL_INFO[];
  vehicleImage: ImagePickerImg;
}
