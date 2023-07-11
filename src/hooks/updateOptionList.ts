import MakeOptionCodeList from "../utils/makeOptionCodeList";
import { useEffect, useState } from "react";
import { carsApi } from "../utils/Api";

export function UpdateDisableOptionList(modelId: number, optionCodeList: Map<string, boolean>) {
	const optionCodes = MakeOptionCodeList(optionCodeList);
	const [disable, setDisable]  = useState({
		delOptions: []
	})
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.disableOptions(modelId, optionCodes)).data;
			setDisable(data);
		}
		fetchData();
	}, [optionCodes, modelId]);
	return (disable);
}