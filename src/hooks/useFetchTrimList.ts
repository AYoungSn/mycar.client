import { useEffect, useState } from "react"
import { carsApi } from "../utils/Api";
import { Trim } from "../type/ApiResponseType";

export default function useFetchTrimList(carCode: string, selectName: string, names: string[], setModel: any) {
	const [trimList, setTrimList] = useState<Trim[]>([]);
	useEffect(() => {
		async function fetchTrimList() {
			if (selectName !== '') {
				const data = (await carsApi.trimList(carCode, selectName)).data;
				setTrimList(data.trims);
				setModel(data.trims[0]);
			}
		}
		fetchTrimList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectName, names]);
	return (trimList);
}