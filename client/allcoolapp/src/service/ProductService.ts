import requestExecutor from './AxiosService';
import { ProductDTO } from 'src/types/dto';
import { AxiosPromise } from 'axios';

const resource = '/api/products';

export const findAll = (): AxiosPromise<ProductDTO[]> => {
  return requestExecutor.get(resource);
};
