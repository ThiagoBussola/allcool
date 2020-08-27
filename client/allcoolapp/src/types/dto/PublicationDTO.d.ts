import { ReviewDTO } from './';
import { PublicationTypeEnum } from '../enum';
import { NewsDTO } from './NewsDTO';

export type PublicationDTO = {
  id?: string;
  review?: ReviewDTO;
  news?: NewsDTO;
  type?: PublicationTypeEnum;
} & {
  touched?: boolean;
};
