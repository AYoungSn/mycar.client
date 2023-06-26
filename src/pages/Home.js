import Header from "../components/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Api } from "../api/Api";

const Nav = styled.nav`
	display:flex;
	justify-content: flex-start;
	grid-gap: 30px;
	margin: 50px 50px;
`;
const TrimName = styled.h4`
	font-size: 26px;
	text-align: left;
`
const Price = styled.div`
	font-family: "HyundaiSansHeadKR";
	font-size: 22px;
	margin-top: 8px;
	text-align: left;
`
const Button = styled.button`
	background: #f6f3f2;
	border: 3px solid #f6f3f2;
	padding: 30px;
`

function Home() {
	const [menuList, setMenuList] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = (await Api.get("/cars")).data;
			console.log(data);
			const list = [];
			let i = 0;
			for (i = 0; i < data.length; i++) {
				list.push(
					<Button>
						<input hidden value={data[i].carId}/>
						<TrimName>{data[i].carName}</TrimName>
						<Price>{data[i].price} 원</Price>
					</Button>);
			}
			setMenuList(list);
		}
		fetchData();
	}, []);
	return (
		<div>
			<Header/>
			<Nav>
				{menuList}
			</Nav>
		</div>
	)
}

export default Home;