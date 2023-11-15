import { getUserProfile } from './getUserProfile';
import { login } from './login';
import { logout } from './logout';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';

export interface IUserOperators {
  getUserProfile(): void;
  login(username: string, password: string): void;
  logout(): void;
  createUser(email: string, username: string, password: string): void;
  deleteUser(username: string): void;
}

export { getUserProfile, login, logout, createUser, deleteUser };
