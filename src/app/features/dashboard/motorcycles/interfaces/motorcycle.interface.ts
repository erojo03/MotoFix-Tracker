export interface MotorcycleList {
  id: number;
  brand: {
    id: number;
    name: string;
  };
  model: {
    id: number;
    name: string;
  };
  plate: string;
  arrivalDate: Date;
  deliveryDate: Date;
  currentProcess: {
    description: string;
    sequence: number;
    startDate: Date;
  };
}

export interface MotorcycleInfo {
  id: number;
  brand: string;
  plate: string;
}
