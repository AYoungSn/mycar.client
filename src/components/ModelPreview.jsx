import styled from "styled-components";
import { FlexItem } from "./styled/FlexItem";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { priceState } from "../utils/recoil/price";

const Preview = styled(FlexItem)`
	width: 400px;
`;
const PriceDiv = styled.div`
	margin-top: 50px;
`;
const ModelName = styled.span`
	margin-top: 15px;
	margin-right: 40px;
	display: inline-block;
	color: #666;
`;
const PLabel = styled.span`
	display: inline-block;
	font-size: 19px;
	margin-right: 40px;
`
const Price = styled.b`
	display: inline-block;
	font-size: 30px;
`

export function ModelPreview(props) {
	const [price, setPrice] = useRecoilState(priceState);
	return (
	<>
		<Preview>
			<h2>{props.model.carName} - {props.model.trimName}</h2>
			<ModelName>{props.model.modelName}</ModelName>
			<PriceDiv>
				<PLabel>총 차량 가격</PLabel>
				<Price>{price}</Price>
			</PriceDiv>
		</Preview>
	</>);
}