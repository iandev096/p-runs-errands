import { firestore, auth, User } from 'firebase';
import { ErrandDeliveryDispatch, ErrandDeliveryAction, PostDeliveryAction, PostErrandAction } from './types';

const errandColRef = 'services/errand-delivery/errand';
const deliveryColRef = 'services/errand-delivery/delivery';

async function postDeliveryCase(user: User, action: PostDeliveryAction, dispatch: ErrandDeliveryDispatch) {
  try {
    const deliveryRef = firestore().collection(deliveryColRef);
    const docData = {
      canCancel: true,
      cancelled: false,
      completed: false,
      uid: user.uid,
      detail: action.payload
    };
    return await deliveryRef.add(docData)
  } catch (err) {
    throw new Error('Error posting delivery');
  }
}

async function postErrandCase(user: User, action: PostErrandAction, dispatch: ErrandDeliveryDispatch) {
  try {
    const errandRef = firestore().collection(errandColRef);
    const docData = {
      completed: false,
      uid: user.uid,
      detail: action.payload
    };
    return await errandRef.add(docData)
  } catch (err) {
    throw new Error('Error posting errand');
  }
}

export const ErrandDeliveryDispatchMiddleware = (dispatch: ErrandDeliveryDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: ErrandDeliveryAction) => {
      switch (action.type) {
        case 'POST_DELIVERY':
          return postDeliveryCase(user, action, dispatch)
            .then(docRef => {
              dispatch({ type: 'REMOVE_DELIVERY' });
              return docRef;
            });

        case 'POST_ERRAND':
          return postErrandCase(user, action, dispatch)
            .then(docRef => {
              dispatch({ type: 'REMOVE_ERRAND' });
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
