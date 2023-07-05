import { useEffect, useState } from "react";
import { useMakePath } from "./useMakePath";
import { carsApi } from "../utils/Api";

function useFetchTrims(carCode, engineId, gearboxId, drivingId) {
	const [trims, setTrims] = useState('');
	const baseQuery = useMakePath(carCode, engineId, gearboxId, drivingId);
	useEffect(() => {
		async function fetchTrims() {
			setTrims((await carsApi.trims(baseQuery)).data.trims);
		}
		if (engineId !== 0) {
			fetchTrims();
		}
	}, [carCode, engineId, gearboxId, drivingId, baseQuery]);
	return trims;
}

export default useFetchTrims;