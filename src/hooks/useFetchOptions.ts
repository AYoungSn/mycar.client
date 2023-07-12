import { useEffect } from "react";
import MakeOptionCodeList from "../utils/makeOptionCodeList";
import { optionsApi } from "../utils/Api";
import { OptionChoiceType, OptionType } from "../type/optionType";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { detailOptState, hgaOptListState, npfOptListState, npfOptState } from "../utils/recoil/options";
import { optionUpdate } from "../utils/optionUpdate";

export function useFetchSelectList(modelId: number, selectOpts: Map<string, boolean>, setSelectListOpts: any, selectListInit: Map<string, OptionChoiceType>) {
	const [detailOpt, setDetailOpt] = useRecoilState(detailOptState);
	const setHgaList = useSetRecoilState(hgaOptListState);
	const setNpfList = useSetRecoilState(npfOptListState);
	useEffect(() => {
		const optionCodes = MakeOptionCodeList(selectOpts);
		const tmp = new Map(selectListInit);
		async function fetchData() {
			const data = (await optionsApi.disableOptions(modelId, optionCodes)).data;
			data.delOptions.map((item: OptionType) => {
				if (detailOpt.get(item.code)) {
					optionUpdate(item.code, true, setDetailOpt);
				}
				tmp.set(item.code, {...item, choiceYN: false});
			});
			const addData = (await optionsApi.enableOptions(modelId, optionCodes)).data;
			addData.addOptions.map((item: OptionType) => {
				tmp.set(item.code, {...item, choiceYN: true});
			});
			setSelectListOpts(tmp);
			const tuixList = (await optionsApi.tuixList(modelId, optionCodes)).data;
			const hga = new Map();
			tuixList.hga.map((item: OptionType) => {
				hga.set(item.code, {...item, choiceYN: true});
			})
			setHgaList(hga);
			const npf = new Map();
			tuixList.npf.map((item: OptionType) => {
				npf.set(item.code, {...item, choiceYN: true});
			})
			setNpfList(npf);
		}
		fetchData();
	}, [selectOpts]);
}

export function useFetchTuixList(modelId: number) {
	const npfOpt = useRecoilValue(npfOptState);
	const [npfList, setNpfList] = useRecoilState(npfOptListState);
	useEffect(() => {
		const optionCodes = MakeOptionCodeList(npfOpt);
		async function fetchData() {
			const npf = new Map();
			[...npfList].map(([key, value]) => {
				npf.set(key, {...value, choiceYN: true})
			})
			if (optionCodes.length > 0){
				const data = (await optionsApi.disableTuix(modelId, optionCodes)).data;
				data.delOptions.map((item: OptionType) => {
					npf.set(item.code, {...item, choiceYN: false});
				});
			}
			setNpfList(npf);
		}
		fetchData();
		
	}, [npfOpt]);
}