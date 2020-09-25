import { DriverInfoFormData } from "../../../../constants/form/becomeDriver/driverInfo/type";
import { LicenseInfoFormData } from "../../../../constants/form/becomeDriver/licenseInfo/type";
import { ContactAddressFormData } from "../../../../constants/form/becomeDriver/contactAddress/type";

export interface BecomeDriverState {
  driverInfo: DriverInfoFormData,
  licenseInfo: LicenseInfoFormData,
  contactAddress: ContactAddressFormData
}

export type SetDriverInfoAction = { type: 'SET_DRIVER_INFO', payload: DriverInfoFormData };
export type RemoveDriverInfoAction = { type: 'REMOVE_DRIVER_INFO' };

export type SetLicenseInfoAction = { type: 'SET_LICENSE_INFO', payload: LicenseInfoFormData };
export type RemoveLicenseInfoAction = { type: 'REMOVE_LICENSE_INFO' };

export type SetContactAddressAction = { type: 'SET_CONTACT_ADDRESS', payload: ContactAddressFormData };
export type RemoveContactAddressAction = { type: 'REMOVE_CONTACT_ADDRESS' };

type Personal = {firstName: string, lastName: string, mobileNumber: string, email: string};
export type PostedBecomeDriver = DriverInfoFormData & LicenseInfoFormData & ContactAddressFormData & Personal;
export type PostBecomeDriverAction = { type: 'POST_BECOME_DRIVER', payload: PostedBecomeDriver };

export type BecomeDriverAction =

  | SetDriverInfoAction
  | RemoveDriverInfoAction

  | SetLicenseInfoAction
  | RemoveLicenseInfoAction


  | SetContactAddressAction
  | RemoveContactAddressAction

  | PostBecomeDriverAction
  ;

export type BecomeDriverDispatch = (action: BecomeDriverAction) => any;
