import styled from "styled-components";
import Tool from "./styled/Tool";
import { FlexUl } from "./styled/Flex";

function ToolTips(props) {
	const engines = props.tooltips.engines;
	const gearbox = props.tooltips.gearbox;
	const driving = props.tooltips.driving;
	return (
	<section>
		<FlexUl>
			{engines?.length > 0 && 
				<Tool tools={engines} name='엔진' 
					onChange={(id) => {
						props.onChangeEngineId(id);
					}}
					toolId={props.engineId}
				/>
			}
			{gearbox?.length > 0 && 
				<Tool tools={gearbox} name='변속기'
					onChange={(id) => {
						props.onChangeGearboxId(id);
					}}
					toolId={props.gearboxId}
				/>
			}
			{driving?.length > 0 && 
				<Tool tools={driving} name='구동방식'
					onChange={(id) => {
						props.onChangeDrivingId(id);
					}}
					toolId={props.drivingId}
			/>}
		</FlexUl>
	</section>);
}

export default ToolTips;