import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { detailOptState, exteriorListState, exteriorState, interiorListState, interiorState } from "../../utils/recoil/options";
import { optionsApi } from "../../utils/Api";
import MakeOptionCodeList from "../../utils/makeOptionCodeList";
import { allOptionUpdate } from "../../utils/optionUpdate";
import { InteriorType } from "../../type/optionType";

export function useUpdateExteriorList(carCode: string, trimCode: string, modelId: number) {
	const interior = useRecoilValue(interiorState);
	const setExteriorList = useSetRecoilState(exteriorListState);
	const [detailOpts, setDetailOpts] = useRecoilState(detailOptState);
	useEffect(() => {
		if (interior.code !== '' && interior.code !== undefined) {
			checkedOptionList(detailOpts, setDetailOpts, interior, modelId);
		}
		fetchExteriorList(interior, carCode, trimCode, setExteriorList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [interior]);
}

export function useUpdateInteriorList(carCode: string, trimCode: string) {
	const exterior = useRecoilValue(exteriorState);
	const setInteriorList = useSetRecoilState(interiorListState);
	useEffect(() => {
		async function fetchInteriorList() {
			if (exterior.code) {
				const data = (
					await optionsApi.enableInteriorList(
						carCode,
						trimCode,
						exterior.code,
					)
				).data;
				setInteriorList(data.interior);
			}
		}
		fetchInteriorList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exterior]);
}
export async function checkedOptionList(
	detailOpts: Map<string, boolean>,
	setDetailOpts: any,
	interior: InteriorType,
	modelId: number
) {
	const optionCodes = MakeOptionCodeList(detailOpts);
	// api 응답: 체크되어야 하는 옵션 목록들이 돌아옴
	const data = (
		await optionsApi.checkedOptions(
			interior.code,
			optionCodes,
			modelId,
		)
	).data;
	if (data.available === false) {
		allOptionUpdate(data.optionCode, setDetailOpts);
	}
}
export async function fetchExteriorList(
	interior: InteriorType,
	carCode: string,
	trimCode: string,
	setExteriorList: any
) {
	if (interior.code) {
		const data = (
			await optionsApi.enableExteriorList(
				carCode,
				trimCode,
				interior.code,
			)
		).data;
		setExteriorList(data.exterior);
	}
}