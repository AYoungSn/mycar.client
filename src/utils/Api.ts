import axios from "axios";

export const Api = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`
});

export const carsApi = {
	carList: Api.get("/cars"),
	tooltips: (query: string) => Api.get(`/cars/model-filter?${query}`),
	trims: (query: string) => Api.get(`/cars/trims?${query}`),
	init: (modelId: number) => Api.get(`/cars/models/${modelId}/details`),
	enableInteriorList: (carCode : string, trimCode :string, exteriorCode :string) => Api.get(`/cars/interior?carCode=${carCode}&trimCode=${trimCode}&exteriorCode=${exteriorCode}`),
	enableExteriorList: (carCode :string, trimCode :string, interiorCode :string) => Api.get(`/cars/exterior?carCode=${carCode}&trimCode=${trimCode}&interiorCode=${interiorCode}`),
	
};