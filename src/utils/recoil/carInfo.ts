import { atom } from 'recoil';
import { Model } from '../../type/ApiResponseType';

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