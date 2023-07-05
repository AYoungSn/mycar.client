import styled from "styled-components"

const TrimName = styled.h4`
	font-size: ${props => props.isHome ? "26px" : "16px"};
	text-align: ${props => props.isHome ? "left" : "center"};
`
const Price = styled.div`
	font-family: "HyundaiSansHeadKR";
	font-size: ${props => props.isHome ? "22px" : "14px"};
	color: #666;
	margin-top: 8px;
	text-align: ${props => props.isHome ? "left" : "center"};
`
const Button = styled.button`
	background: #f6f3f2;
	border: 3px solid #f6f3f2;
	padding: 30px;
	cursor: pointer;
`
function CarMenuBox({data}) {
	return (
		<a href={"/cars/estimation/model?carId=" + data.carId}>
			<Button>
				<input hidden={true} value={data.carId}/>
				<TrimName isHome={window.location.pathname === '/' ? true : false}>{data.carName}</TrimName>
				<Price isHome={window.location.pathname === '/' ? true : false}>{data.price} 원 ~</Price>
			</Button>
		</a>
	)
}

export default CarMenuBox;