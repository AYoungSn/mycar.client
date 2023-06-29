import styled from "styled-components";
import { useEffect, useState } from "react";
import { Api } from "../api/Api";
import CarMenuBox from "../components/CarMenuBox";
import SimpleHeader from "../components/SimpleHeader";

const Nav = styled.nav`
	display:flex;
	justify-content: flex-start;
	grid-gap: 30px;
	margin: 50px 50px;
`;

function Home() {
	const [menuList, setMenuList] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = (await Api.get("/cars")).data;
			const list = [];
			let i = 0;
			for (i = 0; i < data.length; i++) {
				list.push(<CarMenuBox data={data[i]}/>);
			}
			setMenuList(list);
		}
		fetchData();
	}, []);
	return (
		<div>
			<SimpleHeader/>
			<Nav>
				{menuList}
			</Nav>
		</div>
	)
}

export default Home;