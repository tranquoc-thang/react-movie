const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "164f6433796f38f4827a99a867a11ddb",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
