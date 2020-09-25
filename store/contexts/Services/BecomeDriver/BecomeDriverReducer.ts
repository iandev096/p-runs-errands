import { BecomeDriverState, BecomeDriverAction } from "./types";

export const BecomeDriverReducer = (state: BecomeDriverState, action: BecomeDriverAction): BecomeDriverState => {
  switch (action.type) {
    case 'SET_DRIVER_INFO':
      const driverInfo = action.payload;
      return {
        ...state,
        driverInfo
      }

    case 'REMOVE_DRIVER_INFO':
      const stateAfterRemovedDriverInfo = { ...state };
      delete stateAfterRemovedDriverInfo.driverInfo;
      return {
        ...stateAfterRemovedDriverInfo
      };

    case 'SET_LICENSE_INFO':
      const licenseInfo = action.payload;
      return {
        ...state,
        licenseInfo
      }

    case 'REMOVE_LICENSE_INFO':
      const stateAfterRemovedLicenseInfo = { ...state };
      delete stateAfterRemovedLicenseInfo.licenseInfo;
      return {
        ...stateAfterRemovedLicenseInfo
      };

    case 'SET_CONTACT_ADDRESS':
      const contactAddress = action.payload;
      return {
        ...state,
        contactAddress
      }

    case 'REMOVE_CONTACT_ADDRESS':
      const stateAfterRemovedContactAddress = { ...state };
      delete stateAfterRemovedContactAddress.contactAddress;
      return {
        ...stateAfterRemovedContactAddress
      };

    default:
      return state;
  }
}