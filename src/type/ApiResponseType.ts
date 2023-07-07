import { ExteriorType, InteriorType, OptionType, TooltipType } from "./optionType"

export type CarItem = {
	carId: number,
	carCode: string,
	carType: string,
	carName: string,
	price: number
}

export type Model = {
	trimName: string,
	trimCode: string,
	modelName: string,
	price: number,
	carCode: string,
	carId: number,
	carName: string,
	modelId: number,
	trimId: number
}

export type Trim = {
	trimName: string,
	basicInfo: string,
	trimCode: string,
	price: number,
	modelId: number
}

export type Tooltips = {
	engines: TooltipType[],
	gearbox: TooltipType[],
	driving: TooltipType[]
}

export type Options = {
	select: OptionType[],
	hga: OptionType[],
	npf: OptionType[]
}

export type ModelInfo = {
	model: Model,
	exterior: ExteriorType[],
	interior: InteriorType[],
	options: Options
}