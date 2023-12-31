import { useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Tool from './styled/Tool';
import { FlexUl } from './styled/Flex';
import { drivingIdState, engineIdState, gearboxIdState, tooltipState } from '../utils/recoil/carInfo';
import useSelectTooltips from '../hooks/tooltips/useSelectTooltips';

function ToolTips() {
	const [searchParams] = useSearchParams();
	const carCode = searchParams.get("carCode");
	const [engineId, setEngineId] = useRecoilState(engineIdState);
	const [gearboxId, setGearboxId] = useRecoilState(gearboxIdState);
	const [drivingId, setDrivingId] = useRecoilState(drivingIdState);
	const tooltips = useRecoilValue(tooltipState);
	const engines = tooltips.engines;
	const gearbox = tooltips.gearbox;
	const driving = tooltips.driving;
	useSelectTooltips(carCode || '');
	return (
		<section>
			<FlexUl>
				{engines?.length > 0 && (
					<Tool
						tools={engines}
						name="엔진"
						onChange={(id: number) => {
							setEngineId(id);
						}}
						toolId={engineId}
					/>
				)}
				{gearbox?.length > 0 && (
					<Tool
						tools={gearbox}
						name="변속기"
						onChange={(id: number) => {
							setGearboxId(id);
						}}
						toolId={gearboxId}
					/>
				)}
				{driving?.length > 0 && (
					<Tool
						tools={driving}
						name="구동방식"
						onChange={(id: number) => {
							setDrivingId(id);
						}}
						toolId={drivingId}
					/>
				)}
			</FlexUl>
		</section>
	);
}

export default ToolTips;
