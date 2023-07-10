import { TrimChangeModalDataType } from './ApiResponseType';

export type ColorModalPropsType = {
  colorChange: string;
  colorName: string;
};

type ChangeModal = 'INTERIOR' | 'EXTERIOR' | 'TRIM';

type ModalName = null | `CHANGE-${ChangeModal}` | ``;

export type ModalStateType = {
  modalName: ModalName;
  colorName?: string | null;
  isOpen?: boolean;
  trimChangeData?: TrimChangeModalDataType;
};
