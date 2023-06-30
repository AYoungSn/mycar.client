import { useEffect, useState } from "react";

function useModelFilter(carId, engineId, gearboxId, drivingId) {
	const [path, setPath] = useState('');
	useEffect(() => {
		const makePath = () => {
			let basePath = `carId=${carId}`;
			if (engineId !== undefined || engineId !== '') {
				basePath += `&engineId=${engineId}`;
			}
			if (gearboxId !== undefined || gearboxId !== '') {
				basePath += `&gearboxId=${gearboxId}`;
			}
			if (drivingId !== undefined || drivingId !== '') {
				basePath += `&drivingId=${drivingId}`;
			}
			setPath(basePath);
		}
		makePath();
	}, []);
	return path;
}
export default useModelFilter;