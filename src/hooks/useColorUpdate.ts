import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ExteriorType, InteriorType } from "../type/optionType";
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
          exteriorList[i].choiceYN === false
        ) {
          for (let j = 0; j < exteriorList.length; j++) {
            if (exteriorList[j].choiceYN === true) {
              setExterior({ ...exteriorList[j] });
            }
          }
        }
      }
      if (exteriorList[0] && exterior.choiceYN === false) {
        // 현재 옵션 선택 시 선택 가능한 내장색상 목록 조회
        setExterior({
          ...exteriorList[0],
        });
      }
    }
    initExterior();
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
				setInteriorList(
					data.interior.sort((a: InteriorType, b: InteriorType) =>
						a.choiceYN === true
							? 1
							: b.choiceYN === true
							? a.id > b.id
								? 1
								: -1
							: -1,
					),
				);
				}
		}
		fetchInteriorList();
	}, [exterior]);
}