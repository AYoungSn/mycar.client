import { useRecoilState, useRecoilValue } from "recoil";
import { exteriorListState, exteriorState, interiorListState, interiorState } from "../../utils/recoil/options";
import { useEffect } from "react";
import { InteriorType } from "../../type/optionType";
import { ExteriorType } from "../../type/optionType";


export function useUpdateInteriorListState() {
	const interiorList = useRecoilValue<InteriorType[]>(interiorListState);
	const [interior, setInterior] = useRecoilState(interiorState);
	useEffect(() => {
		function updateInterior() {
			// 현재 interior 의 choiceyn이 false 인 경우
			// 새로운 interiorList 목록에서 선택 가능한 것을 찾아 선택 update
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
				const enableList = [...interiorList].filter((value) => value.choiceYn === true).sort((a, b) => a.id > b.id ? 1 : -1);
				setInterior(enableList[0]);
			}
		}
		updateInterior();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [interiorList]);
}

export function useExteriorState() {
	const exteriorList = useRecoilValue<ExteriorType[]>(exteriorListState);
	const [exterior, setExterior] = useRecoilState(exteriorState);
	useEffect(() => {
		function initExterior() {
			// 현재 exterior가 choiceyn 이 false 인 경우 
			// 새로운 exteriorList 목록 중 선택 가능한 것을 찾아서 선택 update
			for (let i = 0; i < exteriorList.length; i++) {
				if (
					exteriorList[i].id === exterior.id &&
					exteriorList[i].choiceYn === false
				) {
					for (let j = 0; j < exteriorList.length; j++) {
						if (exteriorList[j].choiceYn === true) {
							setExterior({ ...exteriorList[j] });
							break;
						}
					}
					break;
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