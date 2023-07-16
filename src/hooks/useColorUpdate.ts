import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ExteriorType } from "../type/optionType";
import { exteriorListState, exteriorState, interiorListState } from "../utils/recoil/options";
import { optionsApi } from "../utils/Api";

export function useExteriorListState() {
	const exteriorList = useRecoilValue<ExteriorType[]>(exteriorListState);
	const [exterior, setExterior] = useRecoilState(exteriorState);
	useEffect(() => {
		function initExterior() {
			for (let i = 0; i < exteriorList.length; i++) {
				if (
					exteriorList[i].id === exterior.id &&
					exteriorList[i].choiceYn === false
				) {
					for (let j = 0; j < exteriorList.length; j++) {
						if (exteriorList[j].choiceYn === true) {
							setExterior({ ...exteriorList[j] });
						}
					}
				}
			}
			if (exteriorList[0] && exterior.choiceYn === false) {
				// 현재 옵션 선택 시 선택 가능한 내장색상 목록 조회
				const enableList = [...exteriorList].filter((value) => value.choiceYn === true).sort((a, b) => a.id > b.id ? 1 : -1);
				setExterior(enableList[0]);
			}
		}
		initExterior();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exteriorList]);
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