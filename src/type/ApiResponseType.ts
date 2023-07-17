import {
	ExteriorType,
	InteriorType,
	OptionChoiceType,
	OptionType,
	TooltipType,
} from './optionType';

export type CarItem = {
	carId: number;
	carCode: string;
	carType: string;
	carName: string;
	price: number;
};

export type Model = {
	trimName: string;
	trimCode: string;
	modelName: string;
	price: number;
	carCode: string;
	carId: number;
	carName: string;
	modelId: number;
	trimId: number;
};

export type Trim = {
	trimName: string;
	basicInfo: string;
	trimCode: string;
	price: number;
	modelId: number;
};

export type Tooltips = {
	engines: TooltipType[];
	gearbox: TooltipType[];
	driving: TooltipType[];
};

export type Options = {
	detail: OptionChoiceType[];
	hga: OptionChoiceType[];
	npf: OptionChoiceType[];
};

export type ModelInfo = {
	model: Model;
	exterior: ExteriorType[];
	interior: InteriorType[];
	options: Options;
};

export type ChangeOptionType = {
	delOptions: OptionType[];
	addOptions: OptionType[];
};

export type ChangeTrimType = {
	delOptions: OptionType[];
}

export type ChangeTrimInfoType = {
	beforeTrimName: string;
	beforeCarPrice: number;
	changeTrimName: string;
	changeCarPrice: number;
	changeModelId: number;
	changeCarCode: string;
	changeTrimCode: string;
	interiorCode: string;
	colorName: string;
	optionCode: string;
};

export type TrimChangeModalDataType = {
	interiorChangeColorYn?: boolean;
	exteriorChangeColorYn?: boolean;
	changeOptionInfo?: ChangeOptionType;
	changeTrimInfo?: ChangeTrimInfoType;
};
