import { useRecoilState, useRecoilValue } from "recoil";
import { drivingIdState, engineIdState, gearboxIdState, tooltipState } from "../../utils/recoil/carInfo";
import { useEffect } from "react";
import { TooltipType } from "../../type/optionType";

function useSelectTooltips(carCode: string) {
	const [engineId, setEngineId] = useRecoilState(engineIdState);
	const [gearboxId, setGearboxId] = useRecoilState(gearboxIdState);
	const [drivingId, setDrivingId] = useRecoilState(drivingIdState);
	const tooltips = useRecoilValue(tooltipState);
	const engines = tooltips.engines;
	const gearbox = tooltips.gearbox;
	const driving = tooltips.driving;
	useEffect(() => {
		function initTooltips(toolId: number, tools: TooltipType[], setToolId: any) {
			tools.forEach((tool, id) => {
				if (toolId === 0 && id === 0 && tool.isSelect === true) {
					setToolId(tool.id);
				}
				if (toolId === tool.id && tool.isSelect === false) {
					const enableList = tools.filter((value) => value.isSelect);
					setToolId(enableList[0].id);
				}
			})
		}
		initTooltips(engineId, engines, setEngineId);
		initTooltips(gearboxId, gearbox, setGearboxId);
		initTooltips(drivingId, driving, setDrivingId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [carCode, engines, gearbox, driving]);
}

export default useSelectTooltips;