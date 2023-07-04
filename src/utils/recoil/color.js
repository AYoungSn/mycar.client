import { atom } from "recoil";

export const exteriorState = atom({
	key: 'exterior',
	default: 0
})

export const interiorState = atom({
	key: 'interior',
	default: 0
})