import { useEffect } from "react";
import { carsApi } from "../utils/Api";
import { useSetRecoilState } from "recoil";
import { priceState } from "../utils/recoil/price";

export function useFetchModelInit(modelId, setModel, setExterior, setInterior, setOptions) {
	const setPrice = useSetRecoilState(priceState);
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.init(modelId)).data;
			setModel(data.model);
			setPrice(data.model.price);
			setExterior(data.exterior);
			setInterior(data.interior);
			setOptions(data.options);
		}
		fetchData();
	}, []);
}