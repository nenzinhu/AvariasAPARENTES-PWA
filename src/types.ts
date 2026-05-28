export type Severity = 'low' | 'medium' | 'high';
export type DamageType = 'scratch' | 'dent' | 'broken' | 'other';

export interface Damage {
  id: string;
  vehicle: string;
  view: string;
  partId: string;
  partName: string;
  type: DamageType;
  typeName: string;
  severity: Severity;
  notes: string;
  photos: string[]; // Changed from photo?: string to photos: string[]
}

export interface VehicleInfo {
  owner: string;
  phone: string;
  brand: string;
  plate: string;
  generalNotes: string;
  workshop?: string;
  osNumber?: string;
}

export type VehicleType = 'car' | 'moto' | 'truck' | 'bus' | 'van';
export type ViewType = 'lateral-left' | 'lateral-right' | 'frontal' | 'traseira';
