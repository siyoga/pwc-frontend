import { Tag } from './Tag';

export interface Card {
  id: string;
  companyOwner: string;
  name: string;
  logoLink: string;
  linkToWebsite: string;
  price: string;
  description: string;
  approved: string;
  tags: Tag[];
  deletedAt: string;
  isDel: number;
  views: number;
}
