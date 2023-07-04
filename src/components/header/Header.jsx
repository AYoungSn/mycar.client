import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { carsApi } from "../../api/Api";
import CarMenuBox from "../CarMenuBox";
import Head from "../styled/Head";
import Logo from "../styled/Logo";

const MenuBtn = styled.button`
	position: relative;
	cursor: pointer;
	background: transparent;
	color: #000000;
	font-family: "HyundaiSansHeadKRR";
	font-size: 16px;
	margin: 32px 0 0 20px;
	border: 0;
	vertical-align: top;
`
const Triangle = styled.div`
	border-top: ${props => !props.isOpen ? "7px solid #000" : 0}; // 위
	border-bottom: ${props => props.isOpen ? "7px solid #000" : 0}; // 아래
	border-right: 5px solid transparent;
    border-left: 5px solid transparent;
	margin-left: 18px;
	display: inline-block;
	vertical-align: middle;
`
const Section = styled.section`
	background: #FFF;
	position: absolute;
	z-index: 99;
	width: 100%;
	padding: 20px;
	top: 81px;
	display: flex;
	justify-content: flex-start;
	grid-gap: 30px;
`

function DropDown(props) {
	const list = []
	for(var i = 0; i < props.data.length; i++) {
		list.push(<CarMenuBox key={i} data={props.data[i]}/>)
	}
	return <Section>
		{list}
	</Section>
}
function Menu(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [carName, setCarName] = useState('');
	const [data, setData] = useState([]);
	async function fetchData() {
		setData((await carsApi.carList).data);
		for(let i = 0; i < data.length; i++) {
			if (data[i].carId === Number(props.carId)) {
				setCarName(data[i].carName);
			}
		}
	}
	useEffect(() => {
		fetchData();
	}, [data.length]);
	return (
		<>
			<MenuBtn onClick={(e) => {
				setIsOpen(!isOpen);
			}}>
				<span>{carName}</span>
				<Triangle isOpen={isOpen}></Triangle>
			</MenuBtn>
			{isOpen ? <DropDown data={data}/> : ''}
		</>
	)
}

function Header(props) {
	return (
		<Head>
			<div>
				<Link to='/'>
					<Logo type="button" name="hyundai"/>
				</Link>
				<Menu carId={props.carId}/>
			</div>
		</Head>
	)
}

export default Header;