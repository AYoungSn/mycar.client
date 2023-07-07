import { useEffect, useState } from "react";
import { carsApi } from "../utils/Api";
import useMakePath from "./useMakePath";
import { Tooltips } from "../type/ApiResponseType";

function useFetchToolTips(carCode :string | null, engineId : number, gearboxId :number, drivingId :number) {
	const [tooltips, setToolTips] = useState<Tooltips>({
		gearbox: [],
		engines: [],
		driving: []
	});
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