import axios from 'axios';
import { ColorChangeType } from '../type/ApiRequestType';

export const Api = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

export const carsApi = {
	carList: Api.get('/cars'),
	tooltips: (query: string) => Api.get(`/cars/model-filter?${query}`),
	trims: (query: string) => Api.get(`/cars/trims?${query}`),
	init: (modelId: number) => Api.get(`/cars/models/${modelId}/details`),
	modelNames: (carCode: string) => Api.get(`/cars/${carCode}/models`),
	trimList: (carCode: string, modelName: string) => Api.get(`/cars/${carCode}/trims?modelBasicName=${modelName}`),
	modelInfo: (modelId: number) => Api.get(`/cars/models/${modelId}`),
};

export const optionsApi = {
	enableInteriorList: (
		carCode: string,
		trimCode: string,
		exteriorCode: string,
	) =>
		Api.get(
			`/cars/interior?carCode=${carCode}&trimCode=${trimCode}&exteriorCode=${exteriorCode}`,
		),
	enableExteriorList: (
		carCode: string,
		trimCode: string,
		interiorCode: string,
	) =>
		Api.get(
			`/cars/exterior?carCode=${carCode}&trimCode=${trimCode}&interiorCode=${interiorCode}`,
		),
	checkedOptions: (
		interiorCode: string,
		optionCodes: string,
		modelId: number,
	) =>
		Api.get(
			`/cars/checked-options?modelId=${modelId}&interiorCode=${interiorCode}&optionCode=${optionCodes}`,
		),
	changeColor: (req: ColorChangeType) =>
		Api.get(
			`/cars/color-change?beforeInteriorCode=${req.beforeInteriorCode}&beforeExteriorCode=${req.beforeExteriorCode}&interiorCode=${req.interiorCode}&exteriorCode=${req.exteriorCode}&modelId=${req.modelId}&carCode=${req.carCode}&optionCode=${req.optionCode}`,
		),
	disableOptions: (modelId: number, optionCode: string) =>
		Api.get(
			`/cars/options/disable?modelId=${modelId}&optionCode=${optionCode}`
		),
	enableOptions: (modelId: number, optionCode: string) =>
		Api.get(
			`/cars/options/enable?modelId=${modelId}&optionCode=${optionCode}`
		),
	optionsChange: (modelId: number, optionCodes: string, addOption: string) =>
		Api.get(`/cars/options/change?modelId=${modelId}&optionCode=${optionCodes}&addOption=${addOption}`),
	tuixList: (modelId: number, optionCode: string) =>
		Api.get(`/cars/options/tuix?modelId=${modelId}&optionCode=${optionCode}`),
	disableTuix: (modelId: number, optionCode: string) =>
		Api.get(`/cars/options/tuix/disable?modelId=${modelId}&optionCode=${optionCode}`),
	checkedInterior: (modelId: number, optionCode: string) =>
		Api.get(`/cars/options/checked-interior?modelId=${modelId}&optionCode=${optionCode}`),
	trimChange: (beforeModelId: number, afterModelId: number, optionCode: string) =>
		Api.get(`/cars/options/trim-change?beforeModelId=${beforeModelId}&afterModelId=${afterModelId}&optionCode=${optionCode}`),
	tuixCheck: (modelId: number, optionCode: string, tuixOptions: string) =>
		Api.get(`/cars/options/tuix-check?modelId=${modelId}&optionCode=${optionCode}&tuixCode=${tuixOptions}`),
};
