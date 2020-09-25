import { firestore, auth, User } from 'firebase';
import { BecomeDriverDispatch, BecomeDriverAction, PostBecomeDriverAction } from './types';

const driversColRef = 'services/driver-service/drivers';

async function postBecomeDriverCase(user: User, action: PostBecomeDriverAction, dispatch: BecomeDriverDispatch) {
  try {
    const driversRef = firestore().collection(driversColRef);
    
    const docData = {
      isAvailable: true,
      uid: user.uid,
      detail: action.payload
    };
    return await driversRef.doc(user.uid).set(docData);
  } catch (err) {
    throw new Error('Error posting your details');
  }
}

export const BecomeDriverDispatchMiddleware = (dispatch: BecomeDriverDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: BecomeDriverAction) => {
      switch (action.type) {
        case 'POST_BECOME_DRIVER':
          return postBecomeDriverCase(user, action, dispatch)
            .then(docRef => {
              dispatch({type: 'REMOVE_DRIVER_INFO'});
              dispatch({type: 'REMOVE_LICENSE_INFO'});
              dispatch({type: 'REMOVE_CONTACT_ADDRESS'});
              return docRef;
            });

        default:
          return dispatch(action);
      }
    }
  } else {
    throw new Error('User not authenticated');
  }
}
