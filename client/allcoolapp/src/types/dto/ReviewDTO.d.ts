import { ProductDTO } from './ProductDTO';
import { File } from '../File';
import { UserClientDTO } from './UserClientDTO';

export type ReviewDTO = {
  id?: string;
  user?: UserClientDTO;
  product?: ProductDTO;
  file?: File;
  description?: string;
  rating?: number;
};
