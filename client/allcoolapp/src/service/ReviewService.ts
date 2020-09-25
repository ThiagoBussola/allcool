import requestExecutor from './AxiosService';
import { AxiosPromise } from 'axios';
import { ReviewFormDTO, ReviewDTO } from '../types/dto';

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

export const findAllByProductId = (
  productId: string
): AxiosPromise<ReviewDTO[]> => {
  return requestExecutor.get(`${resource}/${productId}`);
};

export const findById = (id: string): AxiosPromise<ReviewDTO> => {
  return requestExecutor.get(`${resource}/${id}/view`);
};
