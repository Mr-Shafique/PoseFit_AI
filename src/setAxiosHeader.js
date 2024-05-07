import { getToken } from "./getToken";

const setAxiosHeader = (config) => {
  const token = getToken();
  if (token)
    config.headers.set("Authorization", `Bearer ${token}`);
  return config;
};

export default setAxiosHeader;
