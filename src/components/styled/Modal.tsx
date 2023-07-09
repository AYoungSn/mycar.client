import { styled } from "styled-components";

type ModalContainerType = {
	width: string;
	height: string;
}

export const ModalContainer = styled.div<ModalContainerType>`
	width: ${props => props.width};
	// height: ${props => props.height};
	margin-top: 200px;
	top: 0;
	position: absolute;
	background-color: white;
  	border: 1px solid black;
	padding: 80px 60px;
	text-align: center;
	overflow: hidden;
`;

export const ModalBackground = styled.div`
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const CloseBtn = styled.button`
    position: absolute;
    top: 28px;
    right: 28px;
    width: 50px;
    height: 50px;
	box-sizing: border-box;
	cursor: pointer;
	background: transparent;
	border: none;
`;