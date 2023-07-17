import { useEffect } from "react";
import MakeOptionCodeList from "../utils/makeOptionCodeList";
import { optionsApi } from "../utils/Api";
import { OptionChoiceType, OptionType } from "../type/optionType";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { detailOptState, hgaOptListState, interiorListState, interiorState, npfOptListState, npfOptState } from "../utils/recoil/options";
import { optionUpdate } from "../utils/optionUpdate";

export function useFetchSelectList(modelId: number, selectOpts: Map<string, boolean>, setSelectListOpts: any, selectListInit: Map<string, OptionChoiceType>) {
	const [detailOpt, setDetailOpt] = useRecoilState(detailOptState);
	const setHgaList = useSetRecoilState(hgaOptListState);
	const setNpfList = useSetRecoilState(npfOptListState);
	const [interior, setInterior] = useRecoilState(interiorState);
	const interiorList = useRecoilValue(interiorListState);
	useEffect(() => {
		const optionCodes = MakeOptionCodeList(selectOpts);
		const tmp = new Map(selectListInit);
		async function fetchData() {
			const data = (await optionsApi.disableOptions(modelId, optionCodes)).data;
			data.delOptions.forEach((item: OptionType) => {
				if (detailOpt.get(item.code)) {
					optionUpdate(item.code, true, setDetailOpt);
				}
				tmp.set(item.code, { ...item, choiceYn: false });
			});
			const addData = (await optionsApi.enableOptions(modelId, optionCodes)).data;
			addData.addOptions.forEach((item: OptionType) => {
				tmp.set(item.code, { ...item, choiceYn: true });
			});
			setSelectListOpts(tmp);
			const { available, interiorCodes }: { available: boolean, interiorCodes: string[] } = (await optionsApi.checkedInterior(modelId, optionCodes)).data;
			if (available === true) {
				let exist = false;
				for (let i = 0; i < interiorCodes.length; i++) {
					if (interiorCodes[i] === interior.code) {
						exist = true;
					}
				}
				if (exist === false) {
					const changeInterior = interiorList.filter((element, id, array) => {
						return element.code === interiorCodes[0];
					})
					setInterior(changeInterior[0]);
				}
			}
			const tuixList = (await optionsApi.tuixList(modelId, optionCodes)).data;
			const hga = new Map();
			tuixList.hga.forEach((item: OptionType) => {
				hga.set(item.code, { ...item, choiceYn: true });
			})
			setHgaList(hga);
			const npf = new Map();
			tuixList.npf.forEach((item: OptionType) => {
				npf.set(item.code, { ...item, choiceYn: true });
			})
			setNpfList(npf);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectOpts]);
}

export function useFetchTuixList(modelId: number) {
	const npfOpt = useRecoilValue(npfOptState);
	const [npfList, setNpfList] = useRecoilState(npfOptListState);
	useEffect(() => {
		const optionCodes = MakeOptionCodeList(npfOpt);
		async function fetchData() {
			const npf = new Map();
			[...npfList].forEach(([key, value]) => {
				npf.set(key, { ...value, choiceYn: true })
			})
			if (optionCodes.length > 0) {
				const data = (await optionsApi.disableTuix(modelId, optionCodes)).data;
				data.delOptions.forEach((item: OptionType) => {
					npf.set(item.code, { ...item, choiceYn: false });
				});
			}
			setNpfList(npf);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [npfOpt]);
}