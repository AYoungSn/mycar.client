import { useEffect, useState } from "react";
import { carsApi } from "../utils/Api";
import { useMakePath } from "./useMakePath";

function useFetchToolTips(carCode, engineId, gearboxId, drivingId) {
	const [tooltips, setToolTips] = useState('');
	const baseQuery = useMakePath(carCode, engineId, gearboxId, drivingId);
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.tooltips(baseQuery)).data;
			setToolTips(data);
		}
		fetchData();
	}, [carCode, engineId, gearboxId, drivingId, baseQuery]);
	return tooltips;
}
export default useFetchToolTips;