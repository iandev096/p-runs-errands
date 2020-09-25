export enum CATEGORIES {
  Personal = 'Personal',
  Pickup = 'Pickup',
}
export type DriverCategoryCard = {
  name: CATEGORIES,
  desc: string,
  imageUrl: any,
}

export enum VEHICLE_TYPE {
  Cars = 'Cars',
  Buses = 'Buses',
  LongVehicle = 'LongVehicle',
  Trucks = 'Trucks',
}

export type Driver = {
  firstName: string,
  lastName: string,
  about: string,
  skills: Set<string> | string[],
  typesOfVehicles: Set<VEHICLE_TYPE> | string[],
  imageUrl: any,
  nameOnLicense: string,
  drivingSince: number,
}

