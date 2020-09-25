import { firestore, auth, User } from 'firebase';
import { CargoGoodsDispatch, CargoGoodsAction, PostCargoGoodsAction } from './types';

const cargoGoodsColRef = 'services/cargo-goods/requests';

async function postCargoGoodsCase(user: User, action: PostCargoGoodsAction, dispatch: CargoGoodsDispatch) {
  try {
    const cargoGoodsRef = firestore().collection(cargoGoodsColRef);
    const docData = {
      completed: false,
      canCancel: true,
      cancelled: false,
      uid: user.uid,
      detail: action.payload
    };
    return await cargoGoodsRef.add(docData);
  } catch (err) {
    throw new Error('Error posting delivery');
  }
}

export const CargoGoodsDispatchMiddleware = (dispatch: CargoGoodsDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: CargoGoodsAction) => {
      switch (action.type) {
        case 'POST_CARGO_GOODS':
          return postCargoGoodsCase(user, action, dispatch)
            .then(docRef => {
              dispatch({type: 'REMOVE_CARGO_GOODS'});
              return docRef;
            })

        default:
          return dispatch(action);
      }
    }
  } else {
    throw new Error('User not authenticated');
  }
}
