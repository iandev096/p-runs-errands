import { firestore, auth, User } from 'firebase';
import { RentOutCarDispatch, RentOutCarAction, PostRentOutCarAction } from './types';

const carsColRef = 'services/rent-car-service/cars';

async function postRentOutCarCase(user: User, action: PostRentOutCarAction, dispatch: RentOutCarDispatch) {
  try {
    const carsRef = firestore().collection(carsColRef);
    const docData = {
      uid: user.uid,
      detail: action.payload,
      isAvailable: true
    };
    return await carsRef.add(docData)
  } catch (err) {
    throw new Error('Error posting cars');
  }
}

export const RentOutCarDispatchMiddleware = (dispatch: RentOutCarDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: RentOutCarAction) => {
      switch (action.type) {
        case 'POST_RENT_OUT_CAR':
          return postRentOutCarCase(user, action, dispatch)
            .then(docRef => {
              dispatch({type: 'REMOVE_VEHICLE_DETAILS'});
              dispatch({type: 'REMOVE_DRIVER_OPTIONS'});
              dispatch({type: 'REMOVE_ADDITIONAL_INFO'});
              return docRef;
            })
            .catch(err => { throw err });

        default:
          return dispatch(action);
      }
    }
  } else {
    throw new Error('User not authenticated');
  }
}
