export type ReviewDTO = {
  id?: string;
  userName?: string;
  productName?: string;
  avatarUrl?: string;
  pictureUrl?: string;
  description?: string;
  rating?: number;
} & {
  touched?: boolean;
};
