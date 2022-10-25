import axios from "axios";

export const jsonbinApiConfig = {
  baseUrl: "https://api.jsonbin.io/v3/b",
  apiXMasterKey: "$2b$10$TPvwlL0usB7nwwQI.osoHuwUoj97Hjj.Gzf5Eoak2soqkCad/hxKS",
  binId: "6356371b0e6a79321e32a9bb",
};

const axiosClient = axios.create({
  baseURL: jsonbinApiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key": `${jsonbinApiConfig.apiXMasterKey}`,
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
    return response;
  },
  (error) => {
    throw new Error(error);
  }
);

export const jsonbinApi = {
  register(userList) {
    return axiosClient.put(`/${jsonbinApiConfig.binId}`, {
      userList,
    });
  },
  getUserList() {
    return axiosClient.get(`/${jsonbinApiConfig.binId}`);
  },
};
