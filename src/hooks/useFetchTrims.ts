import { useEffect, useState } from 'react';
import makeToolTipPath from '../utils/makePath';
import { carsApi } from '../utils/Api';
import { Trim } from '../type/ApiResponseType';

function useFetchTrims(
	carCode: string | null,
	engineId: number,
	gearboxId: number,
	drivingId: number,
) {
	const [trims, setTrims] = useState<Trim[]>([]);
	const baseQuery = makeToolTipPath(carCode, engineId, gearboxId, drivingId);
	useEffect(() => {
		async function fetchTrims() {
			setTrims((await carsApi.trims(baseQuery)).data.trims);
		}
		if (carCode !== null && engineId !== 0) {
			fetchTrims();
		}
	}, [carCode, engineId, gearboxId, drivingId, baseQuery]);
	return trims;
}

export default useFetchTrims;
