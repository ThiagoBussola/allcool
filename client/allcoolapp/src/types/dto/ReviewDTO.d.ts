import { ReviewProductFlavor } from './';

export type ReviewDTO = {
  id?: string;
  userName?: string;
  productName?: string;
  avatarUrl?: string;
  pictureUrl?: string;
  description?: string;
  rating?: number;
  flavors?: ReviewProductFlavor[];
} & {
  touched?: boolean;
};
