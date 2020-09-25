import { firestore, auth, User } from 'firebase';
import {
  BookingsDispatch,
  BookingsAction,
  CancelRentCarServiceBookingAction,
  CancelCargoGoodsBookingAction,
  CancelDriverServiceBookingAction,
  CancelDeliveryBookingAction,
  CancelErrandBookingAction,
  GetRentCarServiceBookingAction,
  CargoGoodBooking,
  GetCargoGoodsBookingAction,
  BecomeDriverBooking,
  GetDriverServiceBookingAction,
  DeliveryBooking,
  GetDeliveryBookingAction,
  ErrandBooking,
  GetErrandBookingAction
} from './types';
import { RentCarBooking } from './types';
import { RentOutCarData } from '../Services/RentOutCar/types';
import { CargoDetailsFormData } from '../../../constants/form/cargoDetails/types';
import { PostedBecomeDriver } from '../Services/BecomeDriver/types';
import { DeliveryFormData } from '../../../constants/form/errandDelivery/delivery/type';
import { ErrandFormData } from '../../../constants/form/errandDelivery/errand/type';

const rentCarServiceBookingColRef = 'services/rent-car-service/cars';
const cargoGoodsBookingColRef = 'services/cargo-goods/requests';
const driverServiceBookingColRef = 'services/driver-service/drivers';
const errandBookingColRef = 'services/errand-delivery/errand';
const deliveryBookingColRef = 'services/errand-delivery/delivery';

async function fetchRentCarServiceBookingCase(user: User, dispatch: BookingsDispatch) {
  try {
    const carsRef = firestore().collection(rentCarServiceBookingColRef);
    const carsSnapshot = await carsRef
      .where('uid', '==', user.uid)
      .get();

    const fetchedCarBookings: RentCarBooking[] = [];
    carsSnapshot.forEach((doc) => {
      
      fetchedCarBookings.push({
        detail: doc.data()?.detail as RentOutCarData,
        docId: doc.id,
        isAvailable: doc.data()?.isAvailable,
        uid: doc.data()?.uid
      });

    });

    if (fetchedCarBookings.length > 0) {
      const dispatchAction: GetRentCarServiceBookingAction = {
        type: 'GET_RENT_CAR_SERVICE_BOOKING',
        payload: fetchedCarBookings
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Orders not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching cars');
  }
}

async function cancelRentCarServiceBookingCase(user: User, action: CancelRentCarServiceBookingAction, dispatch: BookingsDispatch) {
  try {
    await firestore().collection(rentCarServiceBookingColRef)
      .doc(action.payload.docId)
      .update({
        isAvailable: false
      });
    return dispatch(action);
  } catch (err) {
    throw new Error(err.message ?? 'Error');
  }
}

async function fetchCargoGoodsBookingCase(user: User, dispatch: BookingsDispatch) {
  try {
    const cargoRef = firestore().collection(cargoGoodsBookingColRef);
    const carsSnapshot = await cargoRef
      .where('uid', '==', user.uid)
      .get();

    const fetchedCargoBookings: CargoGoodBooking[] = [];
    carsSnapshot.forEach((doc) => {
      fetchedCargoBookings.push({
        detail: doc.data()?.detail as CargoDetailsFormData,
        docId: doc.id,
        uid: doc.data()?.uid,
        completed: doc.data()?.completed,
        canCancel: doc.data()?.canCancel,
        cancelled: doc.data()?.cancel,
      });
    });

    if (fetchedCargoBookings.length > 0) {
      const dispatchAction: GetCargoGoodsBookingAction = {
        type: 'GET_CARGO_GOODS_BOOKING',
        payload: fetchedCargoBookings
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Orders not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching');
  }
}

async function cancelCargoGoodsBookingCase(user: User, action: CancelCargoGoodsBookingAction, dispatch: BookingsDispatch) {
  try {
    const snapshot = await firestore().collection(cargoGoodsBookingColRef)
      .where('uid', '==', user.uid)
      .where('canCancel', '==', true)
      .get();

    snapshot.forEach(async (doc) => {
      if (doc.exists) {
        try {
          await doc.ref.update({
            cancelled: true
          });
        } catch (err) {
          throw err;
        }
      }
    });

    return dispatch(action);
  } catch (err) {
    throw new Error(err.message ?? 'Error');
  }
}

async function fetchDriverServiceBookingCase(user: User, dispatch: BookingsDispatch) {
  try {
    const driversRef = firestore().collection(driverServiceBookingColRef);
    const driversSnapshot = await driversRef
      .where('uid', '==', user.uid)
      .get();

    const fetchedDriverBookings: BecomeDriverBooking[] = [];
    driversSnapshot.forEach((doc) => {
      fetchedDriverBookings.push({
        detail: doc.data()?.detail as PostedBecomeDriver,
        docId: doc.id,
        isAvailable: doc.data()?.isAvailable,
        uid: doc.data()?.uid
      });

    });

    if (fetchedDriverBookings.length > 0) {
      const dispatchAction: GetDriverServiceBookingAction = {
        type: 'GET_DRIVER_SERVICE_BOOKING',
        payload: fetchedDriverBookings[0]
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Orders not found');
    }
  } catch (err) {
    console.log(err)
    throw new Error(err.message ?? 'Error fetching cars');
  } try {

  } catch (err) {

  }
}

async function cancelDriverServiceBookingCase(user: User, action: CancelDriverServiceBookingAction, dispatch: BookingsDispatch) {
  try {
    await firestore().collection(driverServiceBookingColRef)
      .doc(action.payload.docId)
      .update({
        isAvailable: false
      });
    return dispatch(action);
  } catch (err) {
    throw new Error(err.message ?? 'Error');
  }
}

async function fetchDeliveryBookingCase(user: User, dispatch: BookingsDispatch) {
  try {
    const deliveryRef = firestore().collection(deliveryBookingColRef);
    const deliverySnapshot = await deliveryRef
      .where('uid', '==', user.uid)
      .get();

    const fetchedErrandBookings: DeliveryBooking[] = [];
    deliverySnapshot.forEach((doc) => {
      fetchedErrandBookings.push({
        detail: doc.data()?.detail as DeliveryFormData,
        docId: doc.id,
        uid: doc.data()?.uid,
        completed: doc.data()?.completed,
        canCancel: doc.data()?.canCancel,
        cancelled: doc.data()?.cancel,
      });
    });

    if (fetchedErrandBookings.length > 0) {
      const dispatchAction: GetDeliveryBookingAction = {
        type: 'GET_DELIVERY_BOOKING',
        payload: fetchedErrandBookings
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Orders not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching');
  }
}

async function cancelDeliveryBookingCase(user: User, action: CancelDeliveryBookingAction, dispatch: BookingsDispatch) {
  try {
    const snapshot = await firestore().collection(deliveryBookingColRef)
      .where('uid', '==', user.uid)
      .where('canCancel', '==', true)
      .get();

    snapshot.forEach(async (doc) => {
      if (doc.exists) {
        try {
          await doc.ref.update({
            cancelled: true
          });
        } catch (err) {
          throw err;
        }
      }
    });

    return dispatch(action);
  } catch (err) {
    throw new Error(err.message ?? 'Error');
  }
}

async function fetchErrandBookingCase(user: User, dispatch: BookingsDispatch) {
  try {
    const errandRef = firestore().collection(errandBookingColRef);
    const errandSnapshot = await errandRef
      .where('uid', '==', user.uid)
      .get();

    const fetchedErrandBookings: ErrandBooking[] = [];
    errandSnapshot.forEach((doc) => {
      fetchedErrandBookings.push({
        detail: doc.data()?.detail as ErrandFormData,
        docId: doc.id,
        uid: doc.data()?.uid,
        completed: doc.data()?.completed,
        canCancel: doc.data()?.canCancel,
        cancelled: doc.data()?.cancel,
      });
    });

    if (fetchedErrandBookings.length > 0) {
      const dispatchAction: GetErrandBookingAction = {
        type: 'GET_ERRAND_BOOKING',
        payload: fetchedErrandBookings
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Orders not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching');
  }
}

async function cancelErrandBookingCase(user: User, action: CancelErrandBookingAction, dispatch: BookingsDispatch) {
  try {
    const snapshot = await firestore().collection(errandBookingColRef)
      .where('uid', '==', user.uid)
      .where('canCancel', '==', true)
      .get();

    snapshot.forEach(async (doc) => {
      if (doc.exists) {
        try {
          await doc.ref.update({
            cancelled: true
          });
        } catch (err) {
          throw err;
        }
      }
    });

    return dispatch(action);
  } catch (err) {
    throw new Error(err.message ?? 'Error');
  }
}

export const BookingsDispatchMiddleware = (dispatch: BookingsDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: BookingsAction) => {
      switch (action.type) {
        case 'FETCH_RENT_CAR_SERVICE_BOOKING':
          return fetchRentCarServiceBookingCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'CANCEL_RENT_CAR_SERVICE_BOOKING':
          return cancelRentCarServiceBookingCase(user, action, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'FETCH_CARGO_GOODS_BOOKING':
          return fetchCargoGoodsBookingCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'CANCEL_CARGO_GOODS_BOOKING':
          return cancelCargoGoodsBookingCase(user, action, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'FETCH_DRIVER_SERVICE_BOOKING':
          return fetchDriverServiceBookingCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'CANCEL_DRIVER_SERVICE_BOOKING':
          return cancelDriverServiceBookingCase(user, action, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'FETCH_DELIVERY_BOOKING':
          return fetchDeliveryBookingCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'CANCEL_DELIVERY_BOOKING':
          return cancelDeliveryBookingCase(user, action, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'FETCH_ERRAND_BOOKING':
          return fetchErrandBookingCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'CANCEL_ERRAND_BOOKING':
          return cancelErrandBookingCase(user, action, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        default:
          return dispatch(action);
      }
    }
  } else {
    throw new Error('User not authenticated');
  }
}
