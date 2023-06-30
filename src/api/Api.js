import axios from "axios";

export const Api = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`
});

export const carsApi = {
	carList: Api.get("/cars"),
	tooltips: (query) => Api.get(`/cars/model-filter?${query}`),
	trims: (query) => Api.get(`/cars/trims?${query}`),
};