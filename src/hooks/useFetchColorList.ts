import { useEffect, useState } from "react";
import { carsApi } from "../utils/Api";
import { useSetRecoilState } from "recoil";
import { exteriorListState, exteriorState, interiorListState, interiorState } from "../utils/recoil/options";
import { ExteriorType, InteriorType } from "../type/optionType";

export function useFetchInteriorColor(carCode: string, trimCode: string) {
	const setExterior = useSetRecoilState(exteriorState);
	const setInteriorList = useSetRecoilState(interiorListState);
	const [newExterior, setNewExterior] = useState<ExteriorType>({
		id: 0,
		name: '',
		imgUri: '',
		choiceYN: true,
		code: '',
		price: 0
	});
	
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.enableInteriorList(carCode, trimCode, newExterior.code)).data;
			setInteriorList(data);
			setExterior(newExterior);
		}
		if (carCode && trimCode && newExterior)
		{
			fetchData();
		}
	}, [carCode, trimCode, newExterior]);
	return setNewExterior;
}

export function useFetchExteriorColor(carCode :string, trimCode :string, newInterior : InteriorType) {
	const setInterior = useSetRecoilState(interiorState);
	const setExteriorList = useSetRecoilState(exteriorListState);
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.enableExteriorList(carCode, trimCode, newInterior.code)).data;
			setExteriorList(data);
			setInterior(newInterior);
		}
		fetchData();
	}, [carCode, trimCode, newInterior]);
}