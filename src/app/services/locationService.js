import httpService from "./httpService.js";

const locationEndpoint = "location/";

const locationService = {
    getAll: async page => {
        const { data } = await httpService.get(locationEndpoint, { params: { page } });
        return data;
    },
    getFilteredByName: async(name, page) => {
        const { data } = await httpService.get(locationEndpoint, { params: { name, page } });
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
