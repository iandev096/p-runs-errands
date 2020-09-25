import { CATEGORIES, DriverCategoryCard, Driver, VEHICLE_TYPE } from "./types";

export const DRIVER_CATEGORIES: DriverCategoryCard[] = [
  {
    name: CATEGORIES.Personal,
    imageUrl: require('../../assets/img/hdc-personal.png'),
    desc: `Through our reservation system, you can hire a driver to act as your personal chauffeur for the day or evening, no matter how many stops you need to make. Our driver arrives at your home at the requested time, dressed in professional attire, ready to chauffeur you in your vehicle wherever you want to go. When you're ready, you and your car will be returned back home safely`,
  },
  {
    name: CATEGORIES.Pickup,
    imageUrl: require('../../assets/img/hdc-pickup.png'),
    desc: `If you have already driven somewhere, use our pickup service to get both you AND your car back home. We'll dispatch two drivers to your location, one to drive you home in your vehicle and the other to pick up your driver when finished.`,
  }
]

export const HIRE_DRIVERS: Driver[] = [
  {
    firstName: 'Daniel',
    lastName: 'Dwamena',
    about: 'Dedicated and punctual.',
    skills: new Set([
      'Trained On First Aid',
      'Familiar With Vehicle Maintainance',
      'Familiar With Tourist Locations Across The City And Country',
      'Familiar With Bars Resturants Across The City And Country',
      'Familiar With Hotels Across The City And Country'
    ]),
    imageUrl: require('../../assets/img/hd-driver1.jpg'),
    typesOfVehicles: new Set([
      VEHICLE_TYPE.Cars,
      VEHICLE_TYPE.Buses,
      VEHICLE_TYPE.LongVehicle,
      VEHICLE_TYPE.Trucks
    ]),
    nameOnLicense: 'DANIEL DWAMENA',
    drivingSince: 2000,
  },
  {
    firstName: 'Daniel',
    lastName: 'Dwamena',
    about: 'Dedicated and punctual.',
    skills: new Set([
      'Trained On First Aid',
      'Familiar With Vehicle Maintainance',
      'Familiar With Tourist Locations Across The City And Country',
      'Familiar With Bars Resturants Across The City And Country',
      'Familiar With Hotels Across The City And Country'
    ]),
    imageUrl: require('../../assets/img/hd-driver2.jpg'),
    typesOfVehicles: new Set([
      VEHICLE_TYPE.Cars,
      VEHICLE_TYPE.Buses,
      VEHICLE_TYPE.LongVehicle,
      VEHICLE_TYPE.Trucks
    ]),
    nameOnLicense: 'DANIEL DWAMENA',
    drivingSince: 2006,
  },
  {
    firstName: 'Daniel',
    lastName: 'Dwamena',
    about: 'Dedicated and punctual.',
    skills: new Set([
      'Trained On First Aid',
      'Familiar With Vehicle Maintainance',
      'Familiar With Tourist Locations Across The City And Country',
      'Familiar With Bars Resturants Across The City And Country',
      'Familiar With Hotels Across The City And Country'
    ]),
    imageUrl: require('../../assets/img/hd-driver3.jpg'),
    typesOfVehicles: new Set([
      VEHICLE_TYPE.Cars,
      VEHICLE_TYPE.Buses,
      VEHICLE_TYPE.LongVehicle,
      VEHICLE_TYPE.Trucks
    ]),
    nameOnLicense: 'DANIEL DWAMENA',
    drivingSince: 2010,
  }
];
