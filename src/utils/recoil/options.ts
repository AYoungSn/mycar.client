import { atom } from 'recoil';
import {
  ExteriorType,
  InteriorType,
  OptionChoiceType,
} from '../../type/optionType';

export const exteriorState = atom<ExteriorType>({
  key: 'exterior',
  default: {
    id: 0,
    name: '',
    code: '',
    price: 0,
    imgUri: '',
    choiceYn: false,
  },
});

export const exteriorListState = atom<ExteriorType[]>({
  key: 'exteriorList',
  default: [],
});

export const interiorState = atom<InteriorType>({
  key: 'interior',
  default: {
    id: 0,
    name: '',
    code: '',
    imgUri: '',
    choiceYn: false,
  },
});

export const interiorListState = atom<InteriorType[]>({
  key: 'interiorList',
  default: [],
});

export const detailInitListState = atom<Map<string, OptionChoiceType>>({
	key: 'detailListinit',
	default: new Map()
});

export const hgaInitListState = atom<Map<string, OptionChoiceType>>({
	key: 'hgaListinit',
	default: new Map()
});

export const npfInitListState = atom<Map<string, OptionChoiceType>>({
	key: 'npfListinit',
	default: new Map()
});

export const detailOptListState = atom<Map<string, OptionChoiceType>>({
  key: 'detailListOpt',
  default: new Map(),
});

export const hgaOptListState = atom<Map<string, OptionChoiceType>>({
  key: 'hgaListOpt',
  default: new Map(),
});

export const npfOptListState = atom<Map<string, OptionChoiceType>>({
  key: 'npfListOpt',
  default: new Map(),
});

export const detailOptState = atom<Map<string, boolean>>({
  key: 'detailOpt',
  default: new Map(),
});

export const hgaOptState = atom<Map<string, boolean>>({
  key: 'hgaOpt',
  default: new Map(),
});

export const npfOptState = atom<Map<string, boolean>>({
  key: 'npfOpt',
  default: new Map(),
});
