import axios from "axios";

const resource = "/api/products";

export const findAll = () => {
  return axios.get(resource);
};
