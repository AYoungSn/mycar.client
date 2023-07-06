import { useEffect, useState } from "react";
import { carsApi } from "../utils/Api";
import { useSetRecoilState } from "recoil";
import { exteriorListState, exteriorState, interiorListState, interiorState } from "../utils/recoil/options";

export function useFetchInteriorColor() {
	const setExterior = useSetRecoilState(exteriorState);
	const setInteriorList = useSetRecoilState(interiorListState);
	const [carCode, setCarCode] = useState('');
	const [trimCode, setTrimCode] = useState('');
	const [newExterior, setNewExterior] = useState('');
	
	useEffect(() => {
		if (carCode && trimCode && newExterior)
		{
			async function fetchData() {
				const data = (await carsApi.enableInteriorList(carCode, trimCode, newExterior)).data;
				setInteriorList(data);
				setExterior(newExterior);
			}
			fetchData();
		}

	}, [carCode, trimCode, newExterior]);
	return [setCarCode, setTrimCode, setNewExterior];
}

export function useFetchExteriorColor(carCode, trimCode, newInterior) {
	const setInterior = useSetRecoilState(interiorState);
	const setExteriorList = useSetRecoilState(exteriorListState);
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.enableExteriorList(carCode, trimCode, newInterior)).data;
			setExteriorList(data);
			setInterior(newInterior);
		}
		fetchData();
	}, [carCode, trimCode, newInterior]);
}