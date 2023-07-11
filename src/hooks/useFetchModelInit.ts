import { useEffect } from 'react';
import { carsApi } from '../utils/Api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { priceState } from '../utils/recoil/price';
import {
  exteriorListState,
  hgaInitListState,
  hgaOptListState,
  hgaOptState,
  interiorListState,
  npfInitListState,
  npfOptListState,
  npfOptState,
  selectInitListState,
  selectOptListState,
  selectOptState,
} from '../utils/recoil/options';
import { ModelInfo } from '../type/ApiResponseType';
import { ExteriorType } from '../type/optionType';
import { optionListUpdate, optionUpdate } from '../utils/optionUpdate';

export default function useFetchModelInit(modelId: number, setModel: any) {
  const setExteriorList = useSetRecoilState(exteriorListState);
  const setInteriorList = useSetRecoilState(interiorListState);
  const [selectListOpt, setSelectListOpt] = useRecoilState(selectOptListState);
  const [hgaListOpt, setHgaListOpt] = useRecoilState(hgaOptListState);
  const [npfListOpt, setNpfListOpt] = useRecoilState(npfOptListState);
	const setSelectListInit = useSetRecoilState(selectInitListState);
	const setHgaListInit = useSetRecoilState(hgaInitListState);
	const setNpfListInit = useSetRecoilState(npfInitListState);
  const setSelectOpts = useSetRecoilState(selectOptState);
  const setHgaOpts = useSetRecoilState(hgaOptState);
  const setNpfOpts = useSetRecoilState(npfOptState);
  const setPrice = useSetRecoilState(priceState);

  useEffect(() => {
    async function fetchData() {
      const data: ModelInfo = (await carsApi.init(modelId)).data;
      setModel(data.model);
      setPrice(data.model.price);
      setExteriorList(
        data.exterior.sort((a: ExteriorType, b: ExteriorType) =>
          a.choiceYN === true
            ? -1
            : b.choiceYN === true
            ? a.id > b.id
              ? 1
              : 0
            : 1,
        ),
      );
      setInteriorList(
        data.interior.sort((a, b) =>
          a.choiceYN === true
            ? -1
            : b.choiceYN === true
            ? a.id > b.id
              ? 1
              : -1
            : 1,
        ),
      );
			// setSelectDisableOpts(new Map());
			// data.options.select.map((item) => {
			// 	if (item.choiceYN === false) {
			// 		optionUpdate(item.code, false, setSelectDisableOpts);
			// 	}
			// })
			// const select = new Map();
			data.options.select.map((item) => {
				// select.set(item.code, item);
				optionListUpdate(item.code, item, setSelectListOpt);
				optionListUpdate(item.code, item, setSelectListInit);
			})
			// setSelectListInit();
			// setSelectListOpt
			data.options.hga.map((item) => {
				optionListUpdate(item.code, item, setHgaListOpt);
			})
			setHgaListInit(hgaListOpt);
			data.options.npf.map((item) => {
				optionListUpdate(item.code, item, setNpfListOpt);
			})
			setNpfListInit(npfListOpt);
      // setSelectListOpt(data.options.select);
      // setHgaListOpt(data.options.hga);
      // setNpfListOpt(data.options.npf);
      setSelectOpts(new Map());
      setHgaOpts(new Map());
      setNpfOpts(new Map());
    }
    fetchData();
  }, [modelId]);
}
