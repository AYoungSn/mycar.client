import { useEffect } from "react";
import MakeOptionCodeList from "../utils/makeOptionCodeList";
import { optionsApi } from "../utils/Api";
import { InteriorType, OptionChoiceType, OptionType } from "../type/optionType";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { detailOptState, hgaOptListState, hgaOptState, interiorListState, interiorState, npfOptListState, npfOptState } from "../utils/recoil/options";
import { optionUpdate } from "../utils/optionUpdate";

export function useFetchSelectList(modelId: number, selectOpts: Map<string, boolean>, setSelectListOpts: any, selectListInit: Map<string, OptionChoiceType>) {
	const [detailOpt, setDetailOpt] = useRecoilState(detailOptState);
	const [hgaOpt, setHgaOpt] = useRecoilState(hgaOptState);
	const setHgaList = useSetRecoilState(hgaOptListState);
	const [npfOpt, setNpfOpt] = useRecoilState(npfOptState);
	const setNpfList = useSetRecoilState(npfOptListState);
	const [interior, setInterior] = useRecoilState(interiorState);
	const [interiorList, setInteriorList] = useRecoilState(interiorListState);
	useEffect(() => {
		const optionCodes = MakeOptionCodeList(detailOpt);
		const tmp = new Map(selectListInit);
		async function fetchData() {
			const delData = (await optionsApi.disableOptions(modelId, optionCodes)).data;
			delData.delOptions.forEach((item: OptionType) => {
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
			const detailTmp = new Map();
			[...detailOpt].forEach(([key, value]) => {
				if (tmp.has(key)) {
					detailTmp.set(key, value);
				}
			})
			// setDetailOpt(detailTmp);
			const newOptionCodes = MakeOptionCodeList(detailTmp);
			interiorUpdate(modelId, newOptionCodes, interior, setInterior, interiorList, setInteriorList);
			const tuixList = (await optionsApi.tuixList(modelId, newOptionCodes)).data;
			const hga = new Map();
			tuixList.hga.forEach((item: OptionType) => {
				hga.set(item.code, { ...item, choiceYn: true });
			})
			setHgaList(hga);
			const updateHga = new Map();
			hgaOpt.forEach((value, key) => {
				if (hga.has(key)) {
					updateHga.set(key, value);
				}
			});
			setHgaOpt(updateHga);
			const npf = new Map();
			tuixList.npf.forEach((item: OptionType) => {
				npf.set(item.code, { ...item, choiceYn: true });
			})
			setNpfList(npf);
			const updateNpf = new Map();
			npfOpt.forEach((value, key) => {
				if (npf.has(key)) {
					updateNpf.set(key, value);
				}
			})
			setNpfOpt(updateNpf);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailOpt, modelId]);
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
	}, [npfOpt, modelId]);
}

async function interiorUpdate(modelId: number, optionCodes: string,
	interior: InteriorType, setInterior: any,
	interiorList: InteriorType[], setInteriorList: any) {
	const { available, interiorCodes }: { available: boolean, interiorCodes: string[] } =
		(await optionsApi.checkedInterior(modelId, optionCodes)).data;
	if (available === true) {
		let exist = false;
		interiorCodes.filter((value) => value === interior.code)
			.forEach(() => {
				exist = true
			});
		if (exist === false) {
			const changeInterior = interiorList.filter((element, id, array) => {
				return element.code === interiorCodes[0];
			});
			if (changeInterior[0].choiceYn === false) {
				const updateInteriorList = interiorList.map((value) => {
					if (value.code === interiorCodes[0]) {
						return { ...value, choiceYn: true };
					}
					return value;
				})
				setInteriorList(updateInteriorList);
			}
			setInterior({ ...changeInterior[0], choiceYn: true });
		}
	}
}