import { firestore, auth, User } from 'firebase';
import { RentCarDispatch, RentCarAction, Car, GetVehiclesAction, RentAction } from './types';
import { RentCarReq } from '../../Requests/types';

const carsColRef = 'services/rent-car-service/cars';
const rentCarReqColRef = 'requests/rent-car/cars';

async function fetchVehiclesCase(user: User, dispatch: RentCarDispatch) {
  try {
    const carsRef = firestore().collection(carsColRef);
    const carsSnapshot = await carsRef
      .get();

    const fetchedCars: Car[] = [];
    carsSnapshot.forEach((doc) => {

      if (doc.data().uid !== user.uid) {
        fetchedCars.push({
          detail: {
            additionalInfo: doc.data()?.detail?.additionalInfo,
            category: doc.data()?.detail?.category,
            color: doc.data()?.detail?.extColor,
            deposit: doc.data()?.detail.deposit ?? 0,
            description: doc.data()?.detail?.description,
            fuelType: doc.data()?.detail?.fuelType,
            gearbox: doc.data()?.detail?.gearbox,
            imageUrl: doc.data()?.detail?.vehicleImage.uri,
            make: doc.data()?.detail?.make,
            mileage: doc.data()?.detail?.mileage,
            pricePerDay: doc.data()?.detail?.expectedRentPerDay,
            pricePerHalf: doc.data()?.detail?.expectedRentPerHalf,
            RegistrationPlateNumber: doc.data()?.regPlateNumber,
            model: doc.data()?.detail?.model
          },
          docId: doc.id,
          isAvailable: doc.data()?.isAvailable,
        });
      }
    });

    if (fetchedCars.length > 0) {
      const dispatchAction: GetVehiclesAction = {
        type: 'GET_VEHICLES',
        payload: fetchedCars
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Orders not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching cars');
  }
}

async function rentCarCase(user: User, action: RentAction, dispatch: RentCarDispatch) {
  try {
    const carCol = firestore().collection(rentCarReqColRef);

    const carColRes = await carCol
      .where('carId', '==', action.payload.docId)
      .where('requestorUid', '==', user.uid)
      .get();

    let canRentCar = true;
    carColRes.forEach(doc => {
      if (doc.exists) canRentCar = false;
    });

    // cancelled
    if (!canRentCar) return;

    const docData = {
      carId: action.payload.docId,
      carImage: action.payload.detail.imageUrl,
      carMake: action.payload.detail.make,
      minPrice: action.payload.detail.pricePerHalf,
      fuelType: action.payload.detail.fuelType,
      gearbox: action.payload.detail.gearbox,

      requestorEmail: action.payload.email,
      requestorFirstName: action.payload.firstName,
      requestorLastName: action.payload.lastName,
      requestorUid: user.uid,

      completed: false,
      cancelled: false,
      canCancel: true,
    } as RentCarReq;
    return await carCol.add(docData);
  } catch (err) {
    console.log(err)
    throw new Error('Error posting renting car');
  }
}

export const RentCarDispatchMiddleware = (dispatch: RentCarDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: RentCarAction) => {
      switch (action.type) {
        case 'FETCH_VEHICLES':
          return fetchVehiclesCase(user, dispatch)
            .then(val => val)
            .catch(err => { throw err });

        case 'RENT_CAR':
          return rentCarCase(user, action, dispatch)
            .then(val => val)
            .catch(err => { throw err });
          return;

        default:
          return dispatch(action);
      }
    }
  } else {
    throw new Error('User not authenticated');
  }
}
