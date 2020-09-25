import { ImagePickerImg } from "../../../../UIComponents/CustomImagePickerInput";
import { VEHICLE_TYPE } from "../../../../data/hireDrivers/types";

export interface DriverInfoFormData {
  about: string;
  profileImage: ImagePickerImg,
  skills: string[],
  vehicleTypes: VEHICLE_TYPE[]
}
