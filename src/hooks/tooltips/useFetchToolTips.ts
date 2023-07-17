import { useEffect } from 'react';
import { carsApi } from '../../utils/Api';
import makeToolTipPath from '../../utils/makePath';
import { useSetRecoilState } from 'recoil';
import { tooltipState } from '../../utils/recoil/carInfo';

function useFetchToolTips(
	carCode: string | null,
	engineId: number,
	gearboxId: number,
	drivingId: number
) {
	const setToolTips = useSetRecoilState(tooltipState);
	const baseQuery = makeToolTipPath(carCode, engineId, gearboxId, drivingId);
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.tooltips(baseQuery)).data;
			setToolTips(data);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [carCode, engineId, gearboxId, drivingId, baseQuery]);
}
export default useFetchToolTips;
