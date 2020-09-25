import { firestore, auth, User } from 'firebase';
import {
  RequestsDispatch,
  RequestsAction,
  GetRentCarReqsAction,
  CancelHireDriverReqAction,
  CancelRentCarReqAction,
  HireDriverReq,
  GetHireDriverReqsAction,
  RentCarReq
} from './types';

const hireDriverReqCol = 'requests/hire-driver/drivers';
const rentCarReqCol = 'requests/rent-car/cars';

async function fetchHireDriverReqsCase(user: User, dispatch: RequestsDispatch) {
  try {
    const hireDriverReqRef = firestore().collection(hireDriverReqCol);
    const snapShot = await hireDriverReqRef
      .where('requestorUid', '==', user.uid)
      .get();

    const hireDriverReqs = [] as HireDriverReq[];
    snapShot.forEach(doc => {
      if (doc.exists) {
        hireDriverReqs.push({
          canCancel: doc.data()?.canCancel,
          cancelled: doc.data()?.cancelled,
          completed: doc.data()?.completed,
          driverFirstName: doc.data()?.driverFirstName,
          driverId: doc.data()?.driverId,
          driverLastName: doc.data()?.driverLastName,
          driverProfileImage: doc.data()?.driverProfileImage,
          drivingSince: doc.data()?.drivingSince,
          ownerUid: doc.data()?.ownerUid,
          requestorEmail: doc.data()?.requestorEmail,
          requestorFirstName: doc.data()?.requestorFirstName,
          requestorLastName: doc.data()?.requestorLastName,
          requestorUid: doc.data()?.requestorUid,
          vehicleTypes: doc.data()?.vehicleTypes
        });
      }
    })

    if (hireDriverReqs.length > 0) {
      const dispatchAction: GetHireDriverReqsAction = {
        type: 'GET_HIRE_DRIVER_REQS',
        payload: hireDriverReqs
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('')
    }

  } catch (err) {
    throw new Error(err.message ?? 'Error fetching data');
  }
}

async function cancelHireDriverReqsCase(user: User, action: CancelHireDriverReqAction, dispatch: RequestsDispatch) {
  try {
    const snapshot = await firestore().collection(hireDriverReqCol)
      .where('driverId', '==', action.payload.driverId)
      .where('requestorId', '==', user.uid)
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

    return dispatch({ type: 'CANCEL_HIRE_DRIVER_REQ', payload: action.payload });
  } catch (err) {
    throw new Error(err.message ?? 'Error');
  }
}

async function fetchRentCarReqsCase(user: User, dispatch: RequestsDispatch) {
  try {
    const rentCarReqRef = firestore().collection(rentCarReqCol);
    const snapShot = await rentCarReqRef
      .where('requestorUid', '==', user.uid)
      .get();
      
    const rentCarReqs = [] as RentCarReq[];
    snapShot.forEach(doc => {
      if (doc.exists) {
        rentCarReqs.push({
          canCancel: doc.data()?.canCancel,
          cancelled: doc.data()?.cancelled,
          completed: doc.data()?.completed,
          carId: doc.data()?.carId,
          carImage: doc.data()?.carImage,
          carMake: doc.data()?.carMake,
          fuelType: doc.data()?.fuelTtype,
          gearbox: doc.data()?.gearbox,
          minPrice: doc.data()?.minPrice,
          requestorEmail: doc.data()?.requestorEmail,
          requestorFirstName: doc.data()?.requestorFirstName,
          requestorLastName: doc.data()?.requestorLastName,
          requestorUid: doc.data()?.requestorUid,
        });
      }
    })

    if (rentCarReqs.length > 0) {
      const dispatchAction: GetRentCarReqsAction = {
        type: 'GET_RENT_CAR_REQS',
        payload: rentCarReqs
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('')
    }

  } catch (err) {
    throw new Error(err.message ?? 'Error fetching data');
  }
}

async function cancelRentCarReqsCase(user: User, action: CancelRentCarReqAction, dispatch: RequestsDispatch) {
  try {
    const snapshot = await firestore().collection(rentCarReqCol)
      .where('carId', '==', action.payload.carId)
      .where('requestorId', '==', user.uid)
      .get();

    snapshot.forEach(async (doc) => {
      if (doc.exists && doc.data()?.canCancel) {
        try {
          await doc.ref.update({
            cancelled: true
          });
        } catch (err) {
          throw err;
        }
      }
    });

    return dispatch({ type: 'CANCEL_RENT_CAR_REQ', payload: action.payload });
  } catch (err) {
    throw new Error(err.message ?? 'Error cancelling');
  }
}

export const RequestsDispatchMiddleware = (dispatch: RequestsDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: RequestsAction) => {
      switch (action.type) {
        case 'FETCH_HIRE_DRIVERS_REQS':
          return fetchHireDriverReqsCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'CANCEL_HIRE_DRIVER_REQ':
          return cancelHireDriverReqsCase(user, action, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'FETCH_RENT_CAR_REQS':
          return fetchRentCarReqsCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'CANCEL_RENT_CAR_REQ':
          return cancelRentCarReqsCase(user, action, dispatch)
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
