import { atom } from 'recoil';
import { Model, Tooltips } from '../../type/ApiResponseType';

export const priceState = atom<number>({
	key: 'price',
	default: 0,
});

export const modelState = atom<Model>({
	key: 'model',
	default: {
		trimName: '',
		trimCode: '',
		modelName: 'string',
		price: 0,
		carCode: 'string',
		carId: 0,
		carName: 'string',
		modelId: 0,
		trimId: 0,
	}
})

export const tooltipState = atom<Tooltips>({
	key: 'tooltips',
	default: {
		gearbox: [],
		engines: [],
		driving: []
	}
})
export const engineIdState = atom<number>({
	key: 'engineId',
	default: 0
})
export const gearboxIdState = atom<number>({
	key: 'gearboxId',
	default: 0
})
export const drivingIdState = atom<number>({
	key: 'drivingId',
	default: 0
})