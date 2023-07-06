import styled from "styled-components";

export const FlexDiv = styled.div`
	display:flex;
	justify-content: flex-start;
	align-items: center;
	height: 100%;
	grid-gap: 30px;
    gap: 30px;
`;

export const FlexItem = styled.div`
	position: relative;
	text-align: ${props=> props.textAlign};
	padding: 30px;
	height: 100%;
`;

export const FlexUl = styled.ul`
	display: flex;
	flex-wrap: wrap;
`;

export const FlexLi = styled.li`
	display: flex;
	flex-wrap: wrap;
`;