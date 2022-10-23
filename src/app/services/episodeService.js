import httpService from "./httpService.js";

const episodeEndpoint = "episode/";

const episodeService = {
    getAll: async page => {
        const { data } = await httpService.get(episodeEndpoint, { params: { page } });
        return data;
    },
    getFilteredByName: async(name, page) => {
        const { data } = await httpService.get(episodeEndpoint, { params: { name, page } });
        return data;
    },
    get: async id => {
        const { data } = await httpService.get(episodeEndpoint + id);
        return data;
    },
    post: async payload => {
        const { data } = await httpService.post(episodeEndpoint, payload);
        return data;
    },
    put: async(id, payload) => {
        const { data } = await httpService.put(episodeEndpoint + id, payload);
        return data;
    },
    patch: async(id, payload) => {
        const { data } = await httpService.patch(episodeEndpoint + id, payload);
        return data;
    },
    delete: async id => {
        const { data } = await httpService.delete(episodeEndpoint + id);
        return data;
    }
};

export default episodeService;
