import { ProductFlavorDTO } from './ProductFlavorDTO';

export type ReviewDTO = {
  id?: string;
  userClientId?: string;
  productId?: string;
  description?: string;
  rating?: number;
  flavors: ProductFlavorDTO[];
};
