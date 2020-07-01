import requestExecutor from './AxiosService';
import { ProductDTO } from 'src/types/dto';
import { AxiosPromise } from 'axios';
import { Product } from 'src/types';

const resource = '/api/products';

export const findAll = (): AxiosPromise<ProductDTO[]> => {
  return requestExecutor.get(resource);
};

export const findById = (id: string): AxiosPromise<Product> => {
  return requestExecutor.get(`${resource}/${id}`);
};
