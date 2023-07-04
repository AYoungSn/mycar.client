import styled from "styled-components";
import { FlexDiv, FlexItem } from "./Flex";

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
	margin-top: ${props => props.marginTop};
`;
export const OptionColor = styled(FlexItem)`
	font-size: 14px;
	float: right;
`;

export const ColorBtn = styled.button`
	width: ${props => props.width};
	height: ${props => props.height};
	border: ${props => props.active === true ? "4px solid #007fa8;": 0};
`;

export const DisabledBtn = styled.button`
	display: block;
	width: 26px;
	height: 26px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -13px;
	margin-left: -13px;
	background: transparent url(https://www.hyundai.com/static/images/color_alert.png) no-repeat;
	border: 0;
`