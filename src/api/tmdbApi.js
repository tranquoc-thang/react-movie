import axiosClient from "./axiosClient";
import apiConfig from "./apiConfig";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMovieList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, { params: {} });
  },
  getVideos: (cate, id) => {
    const url =
      category[cate] + "/" + id + `/videos?api_key=${apiConfig.apiKey}`;
    return axiosClient.get(url);
  },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url =
      category[cate] + "/" + id + `/credits+?api_key=${apiConfig.apiKey}`;
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url =
      category[cate] + "/" + id + `/similar?api_key=${apiConfig.apiKey}`;
    return axiosClient.get(url, { params: {} });
  },
  people: (params) => {
    const url = `person/popular?api_key=${apiConfig.apiKey}`;
    return axiosClient.get(url, params);
  },
  searchPeople: (params) => {
    const url = `search/person?api_key=${apiConfig.apiKey}`;
    return axiosClient.get(url, params);
  },
};

export default tmdbApi;
