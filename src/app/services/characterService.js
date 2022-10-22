import httpService from "./httpService.js";

const characterEndpoint = "character/";

const characterService = {
    getAll: async page => {
        const { data } = await httpService.get(characterEndpoint, { params: { page } });
        return data;
    },
    get: async id => {
        const { data } = await httpService.get(characterEndpoint + id);
        return data;
    },
    post: async payload => {
        const { data } = await httpService.post(characterEndpoint, payload);
        return data;
    },
    put: async(id, payload) => {
        const { data } = await httpService.put(characterEndpoint + id, payload);
        return data;
    },
    patch: async(id, payload) => {
        const { data } = await httpService.patch(characterEndpoint + id, payload);
        return data;
    },
    delete: async id => {
        const { data } = await httpService.delete(characterEndpoint + id);
        return data;
    }
};

export default characterService;
