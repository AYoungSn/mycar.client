export function useMakePath(carId, engineId, gearboxId, drivingId) {
	// const [path, setPath] = useState(`carId=${carId}`);
	let baseQuery = `carId=${carId}`;
	if (engineId !== 0) {
		baseQuery += `&engineId=${engineId}`;
	}
	if (gearboxId !== 0) {
		baseQuery += `&gearboxId=${gearboxId}`;
	}
	if (drivingId !== 0) {
		baseQuery += `&drivingId=${drivingId}`;
	}
	
	return baseQuery;
}