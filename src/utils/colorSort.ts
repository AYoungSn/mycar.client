import { ExteriorType, InteriorType } from "../type/optionType";

export function ExteriorSort(exteriors: ExteriorType[]) {
	exteriors?.sort((a: ExteriorType, b: ExteriorType) => a.id > b.id ? -1 : 1);
	exteriors?.sort((a: ExteriorType, b: ExteriorType) => a.choiceYn === true ? -1 : 1);
	return exteriors;
}

export function InteriorSort(interiors: InteriorType[]) {
	interiors?.sort((a: InteriorType, b: InteriorType) => a.id > b.id ? -1 : 1);
	interiors?.sort((a: InteriorType, b: InteriorType) => a.choiceYn === true ? -1 : 1);
	return interiors;
}