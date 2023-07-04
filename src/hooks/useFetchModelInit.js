import { useEffect, useState } from "react";
import { carsApi } from "../api/Api";
import { useRecoilState } from "recoil";
import { priceState } from "../utils/recoil/price";

export function useFetchModelInit(modelId) {
	const [model, setModel] = useState('');
	const [exterior, setExterior] = useState([]);
	const [interior, setInterior] = useState([]);
	const [options, setOptions] = useState('');
	const [price, setPrice] = useRecoilState(priceState);
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
	return ({model, exterior, interior, options});
}