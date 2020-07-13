import { FlavorTypeEnum } from '../enum';

export type ProductFlavor = {
  id: string;
  type: FlavorTypeEnum;
  description: string;
};
