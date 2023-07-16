import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { detailOptState, exteriorListState, interiorListState, interiorState } from "../utils/recoil/options";
import { useEffect } from "react";
import { optionsApi } from "../utils/Api";
import { InteriorType } from "../type/optionType";
import MakeOptionCodeList from "../utils/makeOptionCodeList";
import { allOptionUpdate } from "../utils/optionUpdate";

export function useUpdateInterior(modelId: number) {
	const interiorList = useRecoilValue<InteriorType[]>(interiorListState);
	const [interior, setInterior] = useRecoilState(interiorState);
	const [detailOpts, setDetailOpts] = useRecoilState(detailOptState);
	useEffect(() => {
		function updateInterior() {
			for (let i = 0; i < interiorList.length; i++) {
				if (
					interiorList[i].id === interior.id &&
					interiorList[i].choiceYn === false
				) {
					for (let j = 0; j < interiorList.length; j++) {
						if (interiorList[j].choiceYn === true) {
							setInterior({ ...interiorList[j] });
							break;
						}
					}
					break;
				}
			}
			if (interiorList[0] && interior.choiceYn === false) {
				interiorList.forEach((item) => {
					setInterior(item);
				});
			}
		}
		async function checkedOptionList() {
			const optionCodes = MakeOptionCodeList(detailOpts);
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
		updateInterior();
		if (interior.code !== '') {
			checkedOptionList();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [interiorList]);
}

export function useInitInterior(carCode: string, trimCode: string) {
	const interior = useRecoilValue(interiorState);
	const setExteriorList = useSetRecoilState(exteriorListState);
	useEffect(() => {
		async function initInterior() {
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
		initInterior();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [interior]);
}