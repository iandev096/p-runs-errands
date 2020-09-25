export enum EsQUANTITY {
  less100 = 'Less than 100kg',
  upperLim500 = '100kg to 500kg',
  upperLim1000 = '499kg to 1000kg',
  more1000 = 'Greater than 1000kg'
}

export interface CargoDetailsFormData {
  cargoNature: string;
  estimatedQuatity: EsQUANTITY;
  from: { lat: number, lng: number } | null;
  to: { lat: number, lng: number } | null;
};
