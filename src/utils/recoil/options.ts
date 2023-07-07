import { atom } from "recoil";
import { ExteriorType, InteriorType, OptionType } from "../../type/optionType";

export const exteriorState = atom<ExteriorType>({
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

export const exteriorListState = atom<ExteriorType[]>({
	key: 'exteriorList',
	default: []
})

export const interiorState = atom<InteriorType>({
	key: 'interior',
	default: {
		id: 0,
		name: '',
		code: '',
		imgUri: '',
		choiceYN: false
	}
})

export const interiorListState = atom<InteriorType[]>({
	key: 'interiorList',
	default: []
})

export const selectOptListState = atom<OptionType[]>({
	key: 'selectListOpt',
	default: []
})

export const hgaOptListState = atom<OptionType[]>({
	key: 'hgaListOpt',
	default: []
})

export const npfOptListState = atom<OptionType[]>({
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

