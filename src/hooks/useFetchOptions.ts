import { useEffect } from "react";
import MakeOptionCodeList from "../utils/makeOptionCodeList";
import { carsApi } from "../utils/Api";
import { OptionChoiceType, OptionType } from "../type/optionType";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hgaOptListState, npfOptListState } from "../utils/recoil/options";

export function useFetchSelectList(modelId: number, selectOpts: Map<string, boolean>, setSelectListOpts: any, selectListInit: Map<string, OptionChoiceType>) {
	const setHgaList = useSetRecoilState(hgaOptListState);
	const setNpfList = useSetRecoilState(npfOptListState);
	useEffect(() => {
		const optionCodes = MakeOptionCodeList(selectOpts);
		const tmp = new Map(selectListInit);
		async function fetchData() {
			const data = (await carsApi.disableOptions(modelId, optionCodes)).data;
			data.delOptions.map((item: OptionType) => {
				tmp.set(item.code, {...item, choiceYN: false});
			});
			const addData = (await carsApi.enableOptions(modelId, optionCodes)).data;
			addData.addOptions.map((item: OptionType) => {
				tmp.set(item.code, {...item, choiceYN: true});
			});
			setSelectListOpts(tmp);
			const tuixList = (await carsApi.tuixList(modelId, optionCodes)).data;
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
		console.log(tmp);
		fetchData();
	}, [selectOpts]);
}

export function useFetchTuixList(modelId: number, selectOpts: Map<string, boolean>, setSelectListOpts: any, selectListInit: Map<string, OptionChoiceType>) {

}