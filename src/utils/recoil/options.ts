import { atom } from "recoil";
import { Exterior, Interior, Options } from "../../type/optionType";

export const exteriorState = atom<Exterior>({
	key: 'exterior',
	default: {
		id: 0,
		name: '',
		code: '',
		price: 0,
		imgUri: '',
		choiceYN: false
	}
})

export const exteriorListState = atom<Exterior[]>({
	key: 'exteriorList',
	default: []
})

export const interiorState = atom<Interior>({
	key: 'interior',
	default: {
		id: 0,
		name: '',
		code: '',
		imgUri: '',
		choiceYN: false
	}
})

export const interiorListState = atom<Interior[]>({
	key: 'interiorList',
	default: []
})

export const selectOptListState = atom<Options[]>({
	key: 'selectListOpt',
	default: []
})

export const hgaOptListState = atom<Options[]>({
	key: 'hgaListOpt',
	default: []
})

export const npfOptListState = atom<Options[]>({
	key: 'npfListOpt',
	default: []
})

export const selectOptState = atom<Map<string, boolean>>({
	key: 'selectOpt',
	default: new Map()
})

export const hgaOptState = atom<Map<string, boolean>>({
	key: 'hgaOpt',
	default: new Map()
})

export const npfOptState = atom<Map<string, boolean>>({
	key: 'npfOpt',
	default: new Map()
})

