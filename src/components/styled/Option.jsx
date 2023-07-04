import styled from "styled-components";
import { FlexDiv } from "./Flex";
import { FlexItem } from "./FlexItem";

export const OptionHead = styled.h2`
	font-family: "HyundaiSansHeadKR";
	font-size: 30px;
`;

export const OptionTitle = styled(FlexDiv)`
	padding-bottom: 20px;
	justify-content: space-between;
`;

export const OptionName = styled(FlexItem)`
	font-size: 20px;
	padding: 0px;
`;
export const OptionColor = styled(FlexItem)`
	font-size: 14px;
	float: right;
`;

export const ColorBtn = styled.button`
	width: ${props => props.width};
	height: ${props => props.height};
	background-size: cover;
	border: 0;
`;