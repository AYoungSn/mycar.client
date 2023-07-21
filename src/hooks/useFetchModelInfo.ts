import { useEffect } from "react";
import { carsApi } from "../utils/Api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modelState, priceState } from "../utils/recoil/carInfo";
import { ModelInfo } from "../type/ApiResponseType";
import {
	detailInitListState,
	detailOptListState,
	detailOptState,
	hgaInitListState,
	hgaOptListState,
	hgaOptState,
	npfInitListState,
	npfOptListState,
	npfOptState
} from "../utils/recoil/options";
import { optionListUpdate } from "../utils/optionUpdate";

export default function useFetchModelInfo(modelId: number) {
	const setModel = useSetRecoilState(modelState);
	const setPrice = useSetRecoilState(priceState);
	const setDetailListInit = useSetRecoilState(detailInitListState);
	const setHgaListInit = useSetRecoilState(hgaInitListState);
	const setNpfListInit = useSetRecoilState(npfInitListState);
	const [detailOpt, setDetailOpts] = useRecoilState(detailOptState);
	const setHgaOpts = useSetRecoilState(hgaOptState);
	const setNpfOpts = useSetRecoilState(npfOptState);
	const [detailListOpt, setDetailListOpt] = useRecoilState(detailOptListState);
	const setHgaListOpt = useSetRecoilState(hgaOptListState);
	const setNpfListOpt = useSetRecoilState(npfOptListState);

	useEffect(() => {
		async function fetchModelInfo() {
			const modelRes = (await carsApi.modelInfo(modelId)).data;
			setModel(modelRes);
			setPrice(modelRes.price);
			const data: ModelInfo = (await carsApi.init(modelId)).data;
			setDetailListInit(new Map());
			setDetailListOpt(new Map());
			data.options.detail.forEach((item) => {
				optionListUpdate(item.code, item, setDetailListOpt);
				optionListUpdate(item.code, item, setDetailListInit);
			})
			setHgaListInit(new Map());
			setHgaListOpt(new Map());
			data.options.hga.forEach((item) => {
				optionListUpdate(item.code, item, setHgaListOpt);
				optionListUpdate(item.code, item, setHgaListInit);
			})
			setNpfListInit(new Map());
			setNpfListOpt(new Map());
			data.options.npf.forEach((item) => {
				optionListUpdate(item.code, item, setNpfListOpt);
				optionListUpdate(item.code, item, setNpfListInit);
			})
			const detail = new Map();
			detailOpt.forEach((value, key) => {
				if (value === true && detailListOpt.get(key)) {
					detail.set(key, value);
				}
			})
			setDetailOpts(detail);
			setHgaOpts(new Map());
			setNpfOpts(new Map());
		}
		fetchModelInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modelId]);
}