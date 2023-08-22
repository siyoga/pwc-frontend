import { Card } from './Card';
import { RefreshToken } from './Tokens';

interface User {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Company extends User {
  linkToCompany: string;
  viaGoogle: boolean;
  refreshToken: RefreshToken;
  cards: Card[] | null;
}

export interface CompanyCredentials
  extends Omit<User, 'picture' | 'createdAt' | 'updatedAt' | 'name'> {
  password?: string;
  viaGoogle: boolean;
}
