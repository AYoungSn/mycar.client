import { useEffect } from "react";
import { carsApi } from "../utils/Api";
import { useSetRecoilState } from "recoil";
import { priceState } from "../utils/recoil/price";
import { exteriorListState, hgaOptListState, hgaOptState, interiorListState, npfOptListState, npfOptState, selectOptListState, selectOptState } from "../utils/recoil/options";
import { ModelInfo } from "../type/ApiResponseType";
import { ExteriorType } from "../type/optionType";

export default function useFetchModelInit(modelId :number, setModel:any) {
	const setExterior = useSetRecoilState(exteriorListState);
	const setInterior = useSetRecoilState(interiorListState);
	const setSelectListOpt = useSetRecoilState(selectOptListState);
	const setHgaListOpt = useSetRecoilState(hgaOptListState);
	const setNpfListOpt = useSetRecoilState(npfOptListState);
	const setSelectOpts = useSetRecoilState(selectOptState);
	const setHgaOpts = useSetRecoilState(hgaOptState);
	const setNpfOpts = useSetRecoilState(npfOptState);
	const setPrice = useSetRecoilState(priceState);
	useEffect(() => {
		async function fetchData() {
			const data : ModelInfo = (await carsApi.init(modelId)).data;
			setModel(data.model);
			setPrice(data.model.price);
			setExterior(data.exterior.sort((a :ExteriorType, b :ExteriorType) => a.choiceYN === true ? -1 : (b.choiceYN === true ? 0 : 1)));
			setInterior(data.interior.sort((a, b) => a.choiceYN === true ? -1 : (b.choiceYN === true ? 0 : 1)));
			setSelectListOpt(data.options.select);
			setHgaListOpt(data.options.hga);
			setNpfListOpt(data.options.npf);
			setSelectOpts(new Map());
			setHgaOpts(new Map());
			setNpfOpts(new Map());
		}
		fetchData();
	}, [modelId]);
}