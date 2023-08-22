import { Tag } from './Tag';

export interface Card {
  id: string;
  companyId: string;
  name: string;
  logoLink: string;
  linkToWebsite: string;
  price: string;
  description: string;
  approved: string;
  tags: Tag[];
  views: number;
}
