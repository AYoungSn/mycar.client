export type Exterior = {
	id: number,
	name: string,
	imgUri: string,
	choiceYN: boolean,
	code: string,
	price: number
};

export type Interior = {
	id: number,
	name: string,
	imgUri: string,
	choiceYN: boolean,
	code: string
}

export type Options = {
	id: number,
	name: string,
	imgUri: string,
	choiceYN: boolean,
	code: string
}

// [['code', true],['code', false],[]]