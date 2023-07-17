import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { carsApi } from '../utils/Api';
import CarMenuBox from '../components/CarMenuBox';
import SimpleHeader from '../components/header/SimpleHeader';
import { CarItem } from '../type/ApiResponseType';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  grid-gap: 30px;
  margin: 50px 50px;
`;

function Home() {
	const [carList, setCarList] = useState<CarItem[]>([]);
	useEffect(() => {
		async function fetchData() {
			const data = (await carsApi.carList).data;
			setCarList(data);
		}
		fetchData();
	}, []);
	return (
		<div>
			<SimpleHeader />
			<Nav>
				{carList?.map((menu) => {
					return <CarMenuBox data={menu} />;
				})}
			</Nav>
		</div>
	);
}

export default Home;
