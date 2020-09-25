import { ServiceCard, EDCatCard } from "./types";

export enum SERVICE_NAME {
  RentCar = 'RentCar',
  ErrandDelivery = 'ErrandDelivery',
  HireDriver = 'HireDriver',
  RentOutCar = 'RentOutCar',
  BecomeDriver = 'BecomeDriver',
  CargoGoods = 'CargoGoods'
};
export type SERVICE_NAME_EXP =
  SERVICE_NAME.RentCar |
  SERVICE_NAME.ErrandDelivery |
  SERVICE_NAME.HireDriver |
  SERVICE_NAME.RentOutCar |
  SERVICE_NAME.BecomeDriver |
  SERVICE_NAME.CargoGoods;

export const SERVICES: ServiceCard[] = [
  {
    title: 'Rent a car',
    description: 'Allows users to rent vehicles of various classes',
    imageUrl: require('../../assets/img/st-car-rent.png'),
    name: SERVICE_NAME.RentCar
  },
  {
    title: 'Errand / Delivery Services',
    description: 'Employ our errand services',
    imageUrl: require('../../assets/img/st-errand.png'),
    name: SERVICE_NAME.ErrandDelivery
  },
  {
    title: 'Cargo / Goods Services',
    description: 'Employ our delivery services.',
    imageUrl: require('../../assets/img/st-pickup.png'),
    name: SERVICE_NAME.CargoGoods
  },
  {
    title: 'Hire a Driver',
    description: 'Allows users to rent vehicles of various classes',
    imageUrl: require('../../assets/img/st-hire-driver.png'),
    name: SERVICE_NAME.HireDriver
  },
  {
    title: 'Rent out your Car',
    description: 'Put out your car for other user to rent at a fee payable to you.',
    imageUrl: require('../../assets/img/st-rent-car.png'),
    name: SERVICE_NAME.RentOutCar
  },
  {
    title: 'Become a Driver',
    description: 'Sign up on the platform as a driver',
    imageUrl: require('../../assets/img/st-become-driver.png'),
    name: SERVICE_NAME.BecomeDriver
  }
];

export const ED_CATEGORIES: EDCatCard[] = [
  {
    name: 'Request Errand Service',
    imageUrl: require('../../assets/img/pd-courier.png'),
    type: 'errand'
  },
  {
    name: 'Request Delivery Service',
    imageUrl: require('../../assets/img/pd-moving-relocating.png'),
    type: 'delivery'
  }
]