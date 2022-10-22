import httpService from "./httpService.js";

const locationEndpoint = "location/";

const locationService = {
    getAll: async() => {
        const { data } = await httpService.get(locationEndpoint);
        return data;
    },
    get: async id => {
        const { data } = await httpService.get(locationEndpoint + id);
        return data;
    },
    post: async payload => {
        const { data } = await httpService.post(locationEndpoint, payload);
        return data;
    },
    put: async(id, payload) => {
        const { data } = await httpService.put(locationEndpoint + id, payload);
        return data;
    },
    patch: async(id, payload) => {
        const { data } = await httpService.patch(locationEndpoint + id, payload);
        return data;
    },
    delete: async id => {
        const { data } = await httpService.delete(locationEndpoint + id);
        return data;
    }
};

export default locationService;
