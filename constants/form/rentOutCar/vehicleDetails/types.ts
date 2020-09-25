import { CATEGORIES, gearbox, fuel } from "../../../../data/vehicles/types";

export interface VehicleDetailFormData {
  make: string,
  model: string,
  fuelType: fuel,
  category: CATEGORIES[],
  gearbox: gearbox,
  mileage: number,
  extColor: string,
  regPlateNumber: string
};
