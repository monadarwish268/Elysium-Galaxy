export interface IUser {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
  updatedAt?: string;
}

export type CreateUserDTO = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;