import { ReviewDTO } from './';
import { PublicationTypeEnum } from '../enum';
import { News } from '../News';

export type PublicationDTO = {
  id?: string;
  review?: ReviewDTO;
  news?: News;
  type?: PublicationTypeEnum;
} & {
  touched?: boolean;
};
