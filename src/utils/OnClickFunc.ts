import { TrimChangeModalDataType } from "../type/ApiResponseType";
import { ExteriorType, InteriorType } from "../type/optionType";
import { optionsApi } from "./Api";
import MakeOptionCodeList from "./makeOptionCodeList";

export async function disableColor(
	detailOpts: Map<string, boolean>, 
	exterior: ExteriorType, 
	interior: InteriorType, 
	modelId: number, 
	carCode: string,
	int:InteriorType,
	ext:ExteriorType,
	setModal: any) {
	const optionCodes = MakeOptionCodeList(detailOpts);
	const data: TrimChangeModalDataType = (
		await optionsApi.changeColor({
			beforeExteriorCode: exterior.code,
			beforeInteriorCode: interior.code,
			interiorCode: int.code,
			exteriorCode: ext.code,
			modelId: modelId,
			carCode: carCode,
			optionCode: optionCodes,
		})
	).data;
	if (data.exteriorChangeColorYn === true) {
		setModal({
			modalName: 'CHANGE-EXTERIOR',
			colorName: int.name,
		});
	} else if (data.interiorChangeColorYn === true) {
		setModal({
			modalName: 'CHANGE-INTERIOR',
			colorName: ext.name,
		});
	} else {
		setModal({
			modalName: 'CHANGE-TRIM',
			colorName: int.name,
			trimChangeData: data,
		});
	}
}