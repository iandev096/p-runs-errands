import { VehicleCategoryCard, CATEGORIES, Vehicle, ADDITIONAL_INFO } from './types';

export const VEHICLE_CATEGORIES: VehicleCategoryCard[] = [
  {
    name: CATEGORIES.Economy,
    title: 'Economic Vehicles only',
    imageUrl: require('../../assets/img/vc-economy.png')
  },
  {
    name: CATEGORIES.Business,
    title: 'Business purposes',
    imageUrl: require('../../assets/img/vc-business.png')
  },
  {
    name: CATEGORIES.Trucks,
    title: 'Trucks only',
    imageUrl: require('../../assets/img/vc-truck.png')
  },
  {
    name: CATEGORIES.Pickups,
    title: 'Pickups and 4x4s',
    imageUrl: require('../../assets/img/vc-pickup.png')
  },
  {
    name: CATEGORIES.Vans,
    title: 'Vans',
    imageUrl: require('../../assets/img/vc-wagon.png')
  },
  {
    name: CATEGORIES.Minivans,
    title: 'Economic Minivan only',
    imageUrl: require('../../assets/img/vc-minivan.png')
  }
];

export const VEHICLES: Vehicle[] = [
  {
    make: 'Bentley',
    category: [CATEGORIES.Business, CATEGORIES.Economy],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'Green',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Green Bentley with sleek leather interior, digital dashboard and comfortable seats',
    isAvailable: true,
    imageUrl: require('../../assets/img/vl-bentley-green.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
      ADDITIONAL_INFO.ABS
    ])
  },
  {
    make: 'Bentley',
    category: [CATEGORIES.Business],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'Silver',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Silver Bentley with sleek leather interior, digital dashboard and comfortable seats',
    isAvailable: true,
    imageUrl: require('../../assets/img/vl-bentley-silver.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
    ])
  },
  {
    make: 'Benz Truck',
    category: [CATEGORIES.Trucks],
    gearbox: 'Manual',
    deposit: 0,
    fuelType: 'Diesel',
    color: 'White',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Huge benz truck with a million horse power.',
    isAvailable: true,
    imageUrl: require('../../assets/img/vl-benz-truck.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
    ])
  },
  {
    make: 'Benz Van',
    category: [CATEGORIES.Trucks, CATEGORIES.Economy],
    gearbox: 'Manual',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'White',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Great Benz van with durable parts. Very strong and solid.',
    isAvailable: true,
    imageUrl: require('../../assets/img/vl-benz-van-white.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
    ])
  },
  {
    make: 'BMW',
    category: [CATEGORIES.Business, CATEGORIES.Economy],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'White',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Great, fast, strong and solid vehicle with awesome interior.',
    isAvailable: true,
    imageUrl: require('../../assets/img/vl-bmw-orange.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
    ])
  },
  {
    make: 'Ford Pickup',
    category: [CATEGORIES.Pickups],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'Silver',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Green Bentley with sleek leather interior, digital dashboard and comfortable seats',
    isAvailable: false,
    imageUrl: require('../../assets/img/vl-ford-pickup-silver.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
      ADDITIONAL_INFO.ABS
    ])
  },
  {
    make: 'Ford Van',
    category: [CATEGORIES.Vans, CATEGORIES.Economy],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'White',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Great, fast, strong and solid vehicle with awesome interior.',
    isAvailable: false,
    imageUrl: require('../../assets/img/vl-ford-van-white.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
    ])
  },
  {
    make: 'GMC Van Truck',
    category: [CATEGORIES.Vans, CATEGORIES.Trucks],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'White',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Great, fast, strong and solid vehicle with awesome interior.',
    isAvailable: false,
    imageUrl: require('../../assets/img/vl-gmc-van-white.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl
    ])
  },
  {
    make: 'Honda Minivan',
    category: [CATEGORIES.Minivans, CATEGORIES.Economy],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Diesel',
    color: 'Ash',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Great, fast, strong and solid vehicle with awesome interior.',
    isAvailable: false,
    imageUrl: require('../../assets/img/vl-honda-minivan-ash.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
    ])
  },
  {
    make: 'Isuzu Pickup',
    category: [CATEGORIES.Pickups, CATEGORIES.Economy],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Diesel',
    color: 'Red',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Great, fast, strong and solid vehicle with awesome interior.',
    isAvailable: true,
    imageUrl: require('../../assets/img/vl-isuzu-pickup-red.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
    ])
  },
  {
    make: 'Isuzu Truck',
    category: [CATEGORIES.Trucks, CATEGORIES.Economy],
    gearbox: 'Automatic',
    deposit: 0,
    fuelType: 'Petrol',
    color: 'Green',
    pricePerDay: 100,
    pricePerHalf: 90,
    mileage: 30000,
    description: 'Great, fast, strong and solid vehicle with awesome interior.',
    isAvailable: true,
    imageUrl: require('../../assets/img/vl-isuzu-truck.jpg'),
    additionalInfo: new Set([
      ADDITIONAL_INFO.AirBag,
      ADDITIONAL_INFO.AirConditioning,
      ADDITIONAL_INFO.AudioSystem,
      ADDITIONAL_INFO.FourWheel,
      ADDITIONAL_INFO.ElectricWindows,
      ADDITIONAL_INFO.CentralLocking,
      ADDITIONAL_INFO.CruiseControl,
    ])
  }
]

