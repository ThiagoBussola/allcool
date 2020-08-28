import { FileDTO } from './FileDTO';

export type UserClientDTO = {
  id?: string;
  name?: string;
  userPicture?: FileDTO;
  bio?: string;
};
