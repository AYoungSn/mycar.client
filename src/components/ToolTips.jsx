import styled from "styled-components";
import Tool from "./styled/Tool";

const FilterList = styled.ul`
	display: flex;
	flex-wrap: wrap;
`

function ToolTips(props) {
	console.log('ToolTips: ', props.tooltips);
	const engines = props.tooltips.engines;
	const gearbox = props.tooltips.gearbox;
	const driving = props.tooltips.driving;
	return (
	<section>
		<FilterList>
			{engines?.length > 0 && <Tool tool={engines} name='엔진'/>}
			{gearbox?.length > 0 && <Tool tool={gearbox} name='변속기'/>}
			{driving?.length > 0 && <Tool tool={driving} name='구동방식'/>}
		</FilterList>
	</section>);
}

export default ToolTips;