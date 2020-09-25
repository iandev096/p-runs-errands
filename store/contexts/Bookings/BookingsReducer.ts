import { BookingsState, BookingsAction } from "./types";

export const BookingsReducer = (state: BookingsState, action: BookingsAction): BookingsState => {
  switch (action.type) {
    case 'CANCEL_CARGO_GOODS_BOOKING':
      const cargoBookingDocId = action.payload.docId;
      const updatedCargoGoods = state.cargoGoods?.map(booking => {
        if (booking.docId === cargoBookingDocId && !booking.cancelled) booking.cancelled = true;
        return booking;
      });
      return {
        ...state,
        cargoGoods: updatedCargoGoods
      };

    case 'GET_CARGO_GOODS_BOOKING':
      const cargoGoodsBookings = action.payload;
      return {
        ...state,
        cargoGoods: cargoGoodsBookings
      }

    case 'CANCEL_DRIVER_SERVICE_BOOKING':
      const driverBookingDocId = action.payload.docId;
      let updatedDriverService;
      if (state.driverService?.docId == driverBookingDocId && state.driverService?.isAvailable) {
        updatedDriverService = { ...state.driverService, isAvailable: false }
      }

      return {
        ...state,
        driverService: updatedDriverService
      };

    case 'GET_DRIVER_SERVICE_BOOKING':
      const driverBooking = action.payload;
      return {
        ...state,
        driverService: driverBooking
      }

    case 'CANCEL_ERRAND_BOOKING':
      const errandDocId = action.payload.docId;
      const updatedErrands = state.errand?.map(booking => {
        if (booking.docId === errandDocId && !booking.cancelled) booking.cancelled = true;
        return booking;
      });
      return {
        ...state,
        errand: updatedErrands
      };

    case 'GET_ERRAND_BOOKING':
      const errandBooking = action.payload;
      return {
        ...state,
        errand: errandBooking
      }

    case 'CANCEL_DELIVERY_BOOKING':
      const deliveryDocId = action.payload.docId;
      const updatedDeliveryBookings = state.delivery?.map(booking => {
        if (booking.docId === deliveryDocId && !booking.cancelled) booking.cancelled = true;
        return booking;
      });
      return {
        ...state,
        delivery: updatedDeliveryBookings
      };

    case 'GET_DELIVERY_BOOKING':
      const deliveryBookings = action.payload;
      return {
        ...state,
        delivery: deliveryBookings
      }

    case 'CANCEL_RENT_CAR_SERVICE_BOOKING':
      const driverDocId = action.payload.docId;
      const updatedDriverBookings = state.rentCarService?.map(booking => {
        if (booking.docId === driverDocId && booking.isAvailable) booking.isAvailable = false;
        return booking;
      });
      return {
        ...state,
        rentCarService: updatedDriverBookings
      };

    case 'GET_RENT_CAR_SERVICE_BOOKING':
      const carBookings = action.payload;
      return {
        ...state,
        rentCarService: carBookings
      }

    default:
      return state;
  }
}

