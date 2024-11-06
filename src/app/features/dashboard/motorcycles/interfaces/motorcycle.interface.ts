export interface MotorcycleList {
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
