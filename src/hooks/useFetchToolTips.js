import { useEffect, useState } from "react";
import { carsApi } from "../utils/Api";
import { useMakePath } from "./useMakePath";

function useFetchToolTips(carId, engineId, gearboxId, drivingId) {
	const [tooltips, setToolTips] = useState('');
	const baseQuery = useMakePath(carId, engineId, gearboxId, drivingId);
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.tooltips(baseQuery)).data;
			setToolTips(data);
		}
		fetchData();
	}, [carId, engineId, gearboxId, drivingId]);
	return tooltips;
}
export default useFetchToolTips;