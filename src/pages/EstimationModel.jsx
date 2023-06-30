import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import ToolTips from "../components/ToolTips";
import { useState } from "react";
import styled from "styled-components";
import useFetchToolTips from "../hooks/useFetchToolTips";
import { useFetchTrims } from "../hooks/useFetchTrims";
import { TrimBox } from "../components/TrimBox";
import { FlexDiv } from "../components/styled/FlexDiv";

const FilterWrap = styled.div``;
const ContentWrap = styled.div`
	padding: 0 50px;
	margin-top: 30px;
`
const TrimWrap = styled(FlexDiv)`
	margin-top: 30px;
	background: #222;
	margin: 0 auto;
	// width:100%;
	height: 370px;
	position: relative;
	display: flex;
`

function EstimationModel() {
	const [searchParams, setSearchParmas] = useSearchParams();
	const [engineId, setEngineId] = useState(0);
	const [gearboxId, setGearboxId] = useState(0);
	const [drivingId, setDrivingId] = useState(0);
	const tooltips = useFetchToolTips(searchParams.get('carId'), engineId, gearboxId, drivingId);
	const trims = useFetchTrims(searchParams.get('carId'), engineId, gearboxId, drivingId);
	console.log(trims)
	const trimList = trims && trims?.map((trim) => {
		return (<TrimBox trim={trim}/>)
	});
	return (
		<div>
			<Header carId={searchParams.get('carId')}></Header>
			<ContentWrap>
				<FilterWrap>
					<ToolTips tooltips={tooltips} 
					onChangeEngineId={(id) => {setEngineId(id)}} engineId={engineId}
					onChangeDrivingId={(id) => {setDrivingId(id)}} drivingId={drivingId}
					onChangeGearboxId={(id) => {setGearboxId(id)}} gearboxId={gearboxId}/>
				</FilterWrap>
				<TrimWrap>
					{trimList}
				</TrimWrap>
			</ContentWrap>
		</div>
	);
}
export default EstimationModel;