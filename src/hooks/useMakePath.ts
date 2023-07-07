export default function useMakePath(carCode :string | null, engineId :number, gearboxId : number, drivingId :number) {
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