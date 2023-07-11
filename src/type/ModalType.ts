import { ChangeOptionType, TrimChangeModalDataType } from './ApiResponseType';

export type ColorModalPropsType = {
  colorChange: string;
  colorName: string;
};

export type OptionModalPropsType = {
	// after
}
type ChangeModal = 'INTERIOR' | 'EXTERIOR' | 'TRIM' | 'MODEL';

type ModalName = null | `CHANGE-${ChangeModal}` | `SUMMARY`;

export type ModalStateType = {
  modalName: ModalName;
  colorName?: string | null;
  isOpen?: boolean;
  trimChangeData?: TrimChangeModalDataType;
	detailOption?: string;
	changeOptionData?: ChangeOptionType;
};
