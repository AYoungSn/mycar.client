import { useEffect } from 'react';
import { carsApi } from '../utils/Api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { priceState } from '../utils/recoil/carInfo';
import {
	exteriorListState,
	hgaInitListState,
	hgaOptListState,
	hgaOptState,
	interiorListState,
	npfInitListState,
	npfOptListState,
	npfOptState,
	detailInitListState,
	detailOptListState,
	detailOptState,
} from '../utils/recoil/options';
import { ModelInfo } from '../type/ApiResponseType';
import { optionListUpdate } from '../utils/optionUpdate';

export default function useFetchModelInit(modelId: number, setModel: any) {
	const setExteriorList = useSetRecoilState(exteriorListState);
	const setInteriorList = useSetRecoilState(interiorListState);
	const setDetailListOpt = useSetRecoilState(detailOptListState);
	const setHgaListOpt = useSetRecoilState(hgaOptListState);
	const setNpfListOpt = useSetRecoilState(npfOptListState);
	const setDetailListInit = useSetRecoilState(detailInitListState);
	const setHgaListInit = useSetRecoilState(hgaInitListState);
	const setNpfListInit = useSetRecoilState(npfInitListState);
	const [detailOpt, setDetailOpts] = useRecoilState(detailOptState);
	const setHgaOpts = useSetRecoilState(hgaOptState);
	const setNpfOpts = useSetRecoilState(npfOptState);
	const setPrice = useSetRecoilState(priceState);

	useEffect(() => {
		async function fetchData() {
			const data: ModelInfo = (await carsApi.init(modelId)).data;
			setModel(data.model);
			setPrice(data.model.price);
			setExteriorList(data.exterior);
			setInteriorList(data.interior);
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
				if (value === true) {
					detail.set(key, value);
				}
			})
			setDetailOpts(detail);
			setHgaOpts(new Map());
			setNpfOpts(new Map());
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
