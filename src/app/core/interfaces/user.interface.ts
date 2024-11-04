interface UserBase {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UserList extends UserBase {
  role: string;
  attendance: string;
}

export interface User extends UserBase {
  password: string;
  roleId: number;
}
