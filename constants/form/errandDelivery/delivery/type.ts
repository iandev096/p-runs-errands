
export interface DeliveryFormData {
  instructions: string;
  contactNumber: string;
  from: { lat: number, lng: number } | null;
  to: { lat: number, lng: number } | null;
}