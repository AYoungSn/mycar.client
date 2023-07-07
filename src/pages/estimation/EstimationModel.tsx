import { useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import ToolTips from "../../components/ToolTips";
import { useState } from "react";
import styled from "styled-components";
import useFetchToolTips from "../../hooks/useFetchToolTips";
import useFetchTrims from "../../hooks/useFetchTrims";
import { TrimBox } from "../../components/TrimBox";
import { FlexDiv } from "../../components/styled/Flex";
import { Trim } from "../../type/ApiResponseType";

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
	const [searchParams] = useSearchParams();
	const [engineId, setEngineId] = useState(0);
	const [gearboxId, setGearboxId] = useState(0);
	const [drivingId, setDrivingId] = useState(0);
	const tooltips = useFetchToolTips(searchParams.get('carCode'), engineId, gearboxId, drivingId);
	const trims = useFetchTrims(searchParams.get('carCode'), engineId, gearboxId, drivingId);
	const carCode : string = searchParams.get('carCode') || '';
	return (
		<div>
			<Header carCode={carCode}></Header>
			<ContentWrap>
				<div>
					<ToolTips tooltips={tooltips} 
					onChangeEngineId={(id :number) => {setEngineId(id)}} engineId={engineId}
					onChangeDrivingId={(id :number) => {setDrivingId(id)}} drivingId={drivingId}
					onChangeGearboxId={(id :number) => {setGearboxId(id)}} gearboxId={gearboxId}/>
				</div>
				<TrimWrap>
					{ trims && 
						trims.map((trim : Trim) => {
							return (
								<TrimBox 
									trim={trim} 
									carCode={carCode}
								/>)
						})
					}
				</TrimWrap>
			</ContentWrap>
		</div>
	);
}
export default EstimationModel;