import { useEffect, useState } from "react";
import { carsApi } from "../api/Api";

function useFetchToolTips(carId, engineId, gearboxId, drivingId) {
	const [tooltips, setToolTips] = useState('');
	useEffect(() => {
		let baseQuery = `carId=${carId}`;
		console.log("carId", carId);
		const makePath = () => {
			if (engineId !== 0) {
				baseQuery += `&engineId=${engineId}`;
			}
			if (gearboxId !== 0) {
				baseQuery += `&gearboxId=${gearboxId}`;
			}
			if (drivingId !== 0) {
				baseQuery += `&drivingId=${drivingId}`;
			}
		}
		makePath();
		async function fetchData() {
			const data = (await carsApi.tooltips(baseQuery)).data;
			setToolTips(data);
		}
		fetchData();
	}, [engineId, gearboxId, drivingId]);
	return tooltips;
}
export default useFetchToolTips;