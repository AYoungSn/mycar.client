import { useEffect, useState } from "react";
import { useMakePath } from "./useMakePath";
import { carsApi } from "../api/Api";

export function useFetchTrims(carId, engineId, gearboxId, drivingId) {
	const [trims, setTrims] = useState('');
	const baseQuery = useMakePath(carId, engineId, gearboxId, drivingId);
	useEffect(() => {
		async function fetchTrims() {
			setTrims((await carsApi.trims(baseQuery)).data.trims);
		}
		if (engineId !== 0) {
			fetchTrims();
		}
	}, [carId, engineId, gearboxId, drivingId]);
	return trims;
}