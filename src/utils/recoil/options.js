import { atom } from "recoil";

export const exteriorState = atom({
	key: 'exterior',
	default: {
		id: 0,
		name: '',
		price: 0
	}
})

export const exteriorListState = atom({
	key: 'exteriorList',
	default: []
})

export const interiorState = atom({
	key: 'interior',
	default: {
		id: 0,
		name: '',
		price: 0
	}
})

export const interiorListState = atom({
	key: 'interiorList',
	default: []
})

export const selectOptListState = atom({
	key: 'selectListOpt',
	default: []
})

export const hgaOptListState = atom({
	key: 'hgaListOpt',
	default: []
})

export const npfOptListState = atom({
	key: 'npfListOpt',
	default: []
})

export const selectOptState = atom({
	key: 'selectOpt',
	default: new Map()
})

export const hgaOptState = atom({
	key: 'hgaOpt',
	default: new Map()
})

export const npfOptState = atom({
	key: 'npfOpt',
	default: new Map()
})

