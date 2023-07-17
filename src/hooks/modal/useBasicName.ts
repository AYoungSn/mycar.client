import { useEffect } from "react";
import { carsApi } from "../../utils/Api";
import { useRecoilValue } from "recoil";
import { modelState } from "../../utils/recoil/carInfo";

export default function useBasicName(
	setBasicName: any,
	selectName: string,
	setSelectName: any) {
	const model = useRecoilValue(modelState);
	useEffect(() => {
		async function fetchBasicName() {
			const names = (await carsApi.modelNames(model.carCode)).data;
			setBasicName(names.models);
			if (selectName === '') {
				setSelectName(names.models[0]);
			}
		}
		fetchBasicName();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [model.carCode]);
	return selectName;
}