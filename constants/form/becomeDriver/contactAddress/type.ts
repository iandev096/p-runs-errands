
export interface ContactAddressFormData {
  currentLocation: { lat: number, lng: number } | null;
  address1: string;
  address2: string;
  contactNumber: string;
  nameOfGuarantor: string;
  guarantorContactNumber: string;
  guarantorAddress: string;
}
