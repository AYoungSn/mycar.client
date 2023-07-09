import { atom } from "recoil";
import { ModalStateType } from "../../type/ModalType";

export const modalState = atom<ModalStateType>({
	key: 'modal',
	default: {
		modalName: null,
	}
});