import { ChangeOptionType, TrimChangeModalDataType, TuixOptions } from './ApiResponseType';

export type ColorModalPropsType = {
	colorChange: string;
	colorName: string;
};

export type OptionModalPropsType = {
	// after
}
type ChangeModal = 'INTERIOR' | 'EXTERIOR' | 'TRIM' | 'MODEL';

type ModalName = null
	| `CHANGE-${ChangeModal}`
	| `DEL-TUIX`
	| `SUMMARY`;

export type ModalStateType = {
	modalName: ModalName;
	colorName?: string | null;
	isOpen?: boolean;
	trimChangeData?: TrimChangeModalDataType;
	detail?: string;
	changeOptionData?: ChangeOptionType;
	delOptions?: TuixOptions;
	detailOption?: string;
};
