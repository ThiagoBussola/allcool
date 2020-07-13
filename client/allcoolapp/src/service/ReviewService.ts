import requestExecutor from './AxiosService';
import { AxiosPromise } from 'axios';
import { ReviewFormDTO } from '../types/dto';

const resource = '/api/reviews';

export const saveReview = (review: ReviewFormDTO): AxiosPromise<void> => {
  return requestExecutor.post(resource, review);
};
