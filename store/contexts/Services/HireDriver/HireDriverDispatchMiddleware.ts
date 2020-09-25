import { firestore, auth, User } from 'firebase';
import { HireDriverDispatch, HireDriverAction, DriverStateProp, GetDriversAction, HireAction } from './types';
import { HireDriverReq } from '../../Requests/types';

const driversColRef = 'services/driver-service/drivers';
const hireDriverReqColRef = 'requests/hire-driver/drivers';

async function fetchDriversCase(user: User, dispatch: HireDriverDispatch) {
  try {
    const driversRef = firestore().collection(driversColRef);
    const driversSnapshot = await driversRef
      .get();

    const fetchedDrivers: DriverStateProp[] = [];

    driversSnapshot.forEach((doc) => {
      if (doc.data().uid !== user.uid) {
        fetchedDrivers.push({
          detail: {
            about: doc.data()?.detail?.about,
            drivingSince: doc.data()?.detail?.drivingSince,
            firstName: doc.data()?.detail?.firstName,
            imageUrl: doc.data()?.detail?.profileImage,
            lastName: doc.data()?.detail?.lastName,
            nameOnLicense: doc.data()?.detail?.nameOnLicense,
            skills: doc.data()?.detail?.skills,
            typesOfVehicles: doc.data()?.vehicleTypes
          },
          docId: doc.id,
          isAvailable: doc.data()?.isAvailable
        });
      }
    });

    if (fetchedDrivers.length > 0) {
      const dispatchedAction: GetDriversAction = {
        type: 'GET_DRIVERS',
        payload: fetchedDrivers
      }
      return dispatch(dispatchedAction);
    } else {

    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching drivers');
  }
}

async function hireDriverCase(user: User, action: HireAction, dispatch: HireDriverDispatch) {
  try {
    const driverCol = firestore().collection(hireDriverReqColRef);
    const docData = {
      driverId: action.payload.docId,
      driverFirstName: action.payload.detail.firstName,
      driverLastName: action.payload.detail.lastName,
      vehicleTypes: (
        action.payload.detail.typesOfVehicles
        && Array.from(action.payload.detail.typesOfVehicles))
        ?? [],

      driverProfileImage: action.payload.detail.imageUrl,
      drivingSince: action.payload.detail.drivingSince,

      requestorEmail: action.payload.email,
      requestorFirstName: action.payload.firstName,
      requestorLastName: action.payload.lastName,
      requestorUid: user.uid,

      completed: false,
      cancelled: false,
      canCancel: true
    }  as HireDriverReq;
    
    return await driverCol.add(docData);
  } catch (err) {
    console.log(err.message);
    throw new Error('Error posting hiring driver');
  }
}

export const HireDriverDispatchMiddleware = (dispatch: HireDriverDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: HireDriverAction) => {
      switch (action.type) {
        case 'FETCH_DRIVERS':
          return fetchDriversCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'HIRE_DRIVER':
          return hireDriverCase(user, action, dispatch)
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
