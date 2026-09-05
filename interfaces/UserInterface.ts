
export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface LoginUserDTO {
  email: string;
  password?: string;
}

export interface LoginResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
}
