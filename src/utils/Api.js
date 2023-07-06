import axios from "axios";

export const Api = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`
});

export const carsApi = {
	carList: Api.get("/cars"),
	tooltips: (query) => Api.get(`/cars/model-filter?${query}`),
	trims: (query) => Api.get(`/cars/trims?${query}`),
	init: (modelId) => Api.get(`/cars/models/${modelId}/details`),
	enableInteriorList: (carCode, trimCode, exteriorCode) => Api.get(`/cars/interior?carCode=${carCode}&trimCode=${trimCode}&exteriorCode=${exteriorCode}`),
	enableExteriorList: (carCode, trimCode, interiorCode) => Api.get(`/cars/exterior?carCode=${carCode}&trimCode=${trimCode}&interiorCode=${interiorCode}`),
	
};