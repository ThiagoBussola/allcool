import requestExecutor from './AxiosService';
import { AxiosPromise } from 'axios';
import { ReviewFormDTO } from '../types/dto';

const resource = '/api/reviews';

export const saveReview = (review: ReviewFormDTO): AxiosPromise<void> => {
  return requestExecutor.post(resource, review);
};

export const isProductReviewed = (
  productId: string,
  userId: string
): AxiosPromise<boolean> => {
  return requestExecutor.get(
    `${resource}/products/${productId}/users/${userId}/verify-user-review`
  );
};
