import Axios from "axios";
import setAxiosHeader from "./setAxiosHeader";
import { getRefreshToken } from "./getToken";

const axiosInstance = Axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

axiosInstance.interceptors.request.use(
  async (config) => setAxiosHeader(config),
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAndRetryQueue = [];
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            await Axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/auth/refresh',
                headers: {
                  'Authorization': `Bearer ${refreshToken}`
                }
              })
              .then(async (response) => {
                localStorage.setItem("token", response.data.access_token);
                return axiosInstance(originalRequest);
              })
              .catch((errorRefresh) => {
                console.log(errorRefresh);
                localStorage.clear();
              });

            // Repeat all missed requests by 401
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosInstance(config)
                .then(resolve)
                .catch(reject);
            });
            refreshAndRetryQueue.length = 0;
          } else {
            localStorage.clear();
            window.location.href = "/";
            return Promise.reject(error);
          }
        } catch (refreshError) {
          refreshAndRetryQueue.length = 0;
          localStorage.clear();
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
