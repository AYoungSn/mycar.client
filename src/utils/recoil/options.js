import { atom } from "recoil";

export const exteriorState = atom({
	key: 'exterior',
	default: {
		id: 0,
		name: '',
		price: 0
	}
})

export const interiorState = atom({
	key: 'interior',
	default: {
		id: 0,
		name: '',
		price: 0
	}
})

export const optionState = atom({
	key: 'options',
	default: {
		select: [
			{
				id: 0,
				name: '',
				price: 0
			}
		],
		hga: [],
		npf: []
	}
})