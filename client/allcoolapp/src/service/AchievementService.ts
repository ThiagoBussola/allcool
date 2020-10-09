import requestExecutor from './AxiosService';
import { AxiosPromise } from 'axios';
import { AchievementViewDTO } from '../types/dto';

const resource = '/api/achievements';

export const findById = (id: string): AxiosPromise<AchievementViewDTO> => {
  return requestExecutor.get(`${resource}/${id}/view`);
};
