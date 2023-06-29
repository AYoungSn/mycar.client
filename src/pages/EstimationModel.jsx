import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import ToolTips from "../components/ToolTips";
import { useState, useEffect } from "react";
import useModelFilter from "../hooks/useModelFilter";
import { Api, carsApi } from "../api/Api";
import styled from "styled-components";

const ContentWrap = styled.div`
	padding: 0 50px;
`

function EstimationModel() {
	const [searchParams, setSearchParmas] = useSearchParams();
	const [engineId, setEngineId] = useState('');
	const [gearboxId, setGearboxId] = useState('');
	const [drivingId, setDrivingId] = useState('');
	const [tooltips, setToolTips] = useState('');
	// const [query, setQuery] = useState('');
	// const path = useModelFilter(searchParams.get('carId'), engineId, gearboxId, drivingId);
	
	useEffect(() => {
		const carId = searchParams.get('carId');
		let baseQuery = `carId=${carId}`;
		console.log("carId", carId);
		const makePath = () => {
			// let basePath = `carId=${carId}`;
			if (engineId !== undefined && engineId !== '') {
				baseQuery += `&engineId=${engineId}`;
			}
			if (gearboxId !== undefined && gearboxId !== '') {
				baseQuery += `&gearboxId=${gearboxId}`;
			}
			if (drivingId !== undefined && drivingId !== '') {
				baseQuery += `&drivingId=${drivingId}`;
			}
			// setQuery(baseQuery)
			// setPath(basePath);
			console.log('query', baseQuery)
		}
		makePath();
		async function fetchData() {
			console.log('fetchData');
			// const data = (await Api.get(`/cars/model-filter?${path}`))
			const data = (await carsApi.tooltips(baseQuery)).data;
			setToolTips(data);
		}
		fetchData();
		// console.log('useEffect');
	}, [engineId, gearboxId, drivingId]);
	return (
		<div>
			<Header carId={searchParams.get('carId')}></Header>
			<ContentWrap>
				<ToolTips tooltips={tooltips} />
			</ContentWrap>
		</div>
	);
}
export default EstimationModel;