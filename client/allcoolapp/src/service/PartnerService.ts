import requestExecutor from './AxiosService';
import { AxiosPromise } from 'axios';
import { PartnerDTO } from '../types/dto';

const resource = '/api/partners';

export const findAll = (): AxiosPromise<PartnerDTO[]> => {
  return requestExecutor.get(resource);
};
