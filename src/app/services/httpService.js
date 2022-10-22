import axios from "axios";

const http = axios.create({
    baseURL: "https://rickandmortyapi.com/api/"
});

http.interceptors.request.use(config => {
    config.url = /\/$/g.test(config.url) ? config.url.slice(0, -1) : config.url;
    return config;
}, error => Promise.reject(error));

const httpService = {
    get: http.get,
    post: http.post,
    patch: http.patch,
    put: http.put,
    delete: http.delete
};

export default httpService;
