export interface signUp {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  roleId: number;
}

export interface logIn {
  phone: string;
  password: string;
}
