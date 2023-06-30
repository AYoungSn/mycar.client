import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import ToolTips from "../components/ToolTips";
import { useState, useEffect } from "react";
import { carsApi } from "../api/Api";
import styled from "styled-components";

const ContentWrap = styled.div`
	padding: 0 50px;
	margin-top: 30px;
`

function EstimationModel() {
	const [searchParams, setSearchParmas] = useSearchParams();
	const [engineId, setEngineId] = useState(0);
	const [gearboxId, setGearboxId] = useState(0);
	const [drivingId, setDrivingId] = useState(0);
	const [tooltips, setToolTips] = useState('');
	
	useEffect(() => {
		const carId = searchParams.get('carId');
		let baseQuery = `carId=${carId}`;
		console.log("carId", carId);
		const makePath = () => {
			// let basePath = `carId=${carId}`;
			if (engineId !== 0) {
				baseQuery += `&engineId=${engineId}`;
			}
			if (gearboxId !== 0) {
				baseQuery += `&gearboxId=${gearboxId}`;
			}
			if (drivingId !== 0) {
				baseQuery += `&drivingId=${drivingId}`;
			}
		}
		makePath();
		async function fetchData() {
			const data = (await carsApi.tooltips(baseQuery)).data;
			setToolTips(data);
		}
		fetchData();
	}, [engineId, gearboxId, drivingId]);
	return (
		<div>
			<Header carId={searchParams.get('carId')}></Header>
			<ContentWrap>
				<ToolTips tooltips={tooltips} 
				setEngineId={setEngineId} engineId={engineId}
				setDrivingId={setDrivingId} drivingId={drivingId}
				setGearboxId={setGearboxId} gearboxId={gearboxId}/>
			</ContentWrap>
		</div>
	);
}
export default EstimationModel;