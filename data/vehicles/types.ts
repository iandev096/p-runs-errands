
export enum CATEGORIES {
  Economy = 'Economy',
  Business = 'Business',
  Pickups = 'Pickups',
  Vans = 'Vans',
  Minivans = 'Minivans',
  Trucks = 'Trucks'
}
export type VehicleCategoryCard = {
  name: CATEGORIES,
  title: string,
  imageUrl: any,
}

export type gearbox = 'Automatic' | 'Manual' | 'Hybrid';
export type fuel =  | 'Petrol' | 'Diesel' | 'Gasoline' | 'N/A';
export type driverOption = 'With Drive' | 'Self Drive' | 'Both';
export enum ADDITIONAL_INFO {
  SelfDrive = 'Self Drive',
  AirBag = 'Air Bag',
  AirConditioning = 'Air Conditioning',
  AudioSystem = 'Audio System',
  CentralLocking = 'Central Locking',
  ElectricWindows = 'Electric Windows',
  CruiseControl = 'Cruise Control',
  ABS = 'ABS',
  FourWheel = 'Four Wheel',
}
export type Vehicle = {
  make : string,
  model?: string,
  category : CATEGORIES[],
  gearbox : gearbox,
  deposit : number,
  fuelType : fuel;
  color : string,
  pricePerDay : number,
  pricePerHalf : number,
  mileage : number,
  description : string,
  imageUrl : any,
  additionalInfo : Set<ADDITIONAL_INFO>,
  RegistrationPlateNumber?: string,
}


