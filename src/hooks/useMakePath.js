export default function useMakePath(carCode, engineId, gearboxId, drivingId) {
	let baseQuery = `carCode=${carCode}`;
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