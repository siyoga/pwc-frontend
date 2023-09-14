import { Card } from './Card';
import { RefreshToken } from './Tokens';

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Company extends User {
  linkToCompany: string;
  viaGoogle: boolean;
  refreshToken: RefreshToken;
  cards: Card[];
}

export interface CompanyUpdatableParams {
  link: string;
  name: string;
  image: string;
}

export interface CompanyCredentials
  extends Omit<User, 'image' | 'createdAt' | 'updatedAt' | 'name'> {
  password?: string;
  viaGoogle: boolean;
}
