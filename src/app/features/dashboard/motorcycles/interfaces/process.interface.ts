export interface MotorcycleProcess {
  motorcycleId: number;
  user?: User;
  startDate: Date;
  endDate: Date;
  process: Process;
}

interface Process {
  description: string;
  sequence: number;
}

interface User {
  firstName: string;
  lastName: string;
}
