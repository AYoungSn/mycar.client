export type ExteriorType = {
  id: number;
  name: string;
  imgUri: string;
  choiceYN: boolean;
  code: string;
  price: number;
};

export type InteriorType = {
  id: number;
  name: string;
  imgUri: string;
  choiceYN: boolean;
  code: string;
};

export type OptionChoiceType = {
  id: number;
  name: string;
  imgUri: string;
  choiceYN: boolean;
  code: string;
  price: number;
};

export type OptionType = {
  name: string;
  imgUri: string;
  code: string;
  price: number;
};

export type TooltipType = {
  id: number;
  name: string;
  isSelect: boolean;
};

// [['code', true],['code', false],[]]
