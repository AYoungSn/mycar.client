import { useEffect } from "react";
import MakeOptionCodeList from "../utils/makeOptionCodeList";
import { carsApi } from "../utils/Api";
import { OptionChoiceType, OptionType } from "../type/optionType";

export function useFetchSelectList(modelId: number, selectOpts: Map<string, boolean>, setSelectListOpts: any, selectListInit: Map<string, OptionChoiceType>) {
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
		}
		console.log(tmp);
		fetchData();
	}, [selectOpts]);
}

export function useFetchTuixList(modelId: number, selectOpts: Map<string, boolean>, setSelectListOpts: any, selectListInit: Map<string, OptionChoiceType>) {

}