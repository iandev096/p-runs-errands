
export type preferredOptions = 'Self drive' | 'With drive' | 'Both';
export interface DriverOptionsFormData {
  preferredOptions: preferredOptions;
  expectedRentPerDay: number;
  expectedRentPerHalf: number;
}