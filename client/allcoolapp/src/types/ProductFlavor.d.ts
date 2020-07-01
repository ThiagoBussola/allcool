import { Product } from './Product';
import { FlavorTypeEnum } from './enum/FlavorTypeEnum';

export type ProductFlavor = {
  id: string;
  type: FlavorTypeEnum;
  description: string;
};
