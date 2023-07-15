export type ExteriorType = {
  id: number;
  name: string;
  imgUri: string;
  choiceYn: boolean;
  code: string;
  price: number;
};

export type InteriorType = {
  id: number;
  name: string;
  imgUri: string;
  choiceYn: boolean;
  code: string;
};

export type OptionChoiceType = {
  name: string;
  imgUri: string;
  choiceYn: boolean;
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
