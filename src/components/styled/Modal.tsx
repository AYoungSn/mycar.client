import { styled } from 'styled-components';

type ModalContainerType = {
	width: string;
	height: string;
};

export const ModalContainer = styled.div<ModalContainerType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: 50px;
  top: 0;
  position: absolute;
  background-color: white;
  border: 1px solid black;
  padding: 80px 60px;
  text-align: center;
  overflow: hidden;
  z-index: 10;
`;

export const ModalBackground = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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

export const PopupHeader = styled.div`
  margin-bottom: 30px;
`;

export const ConfirmBtn = styled.button`
	width: 120px;
	height: 40px;
	font-size: 15px;
	font-family: "HyundaiSansHeadKRR";
	border: 0;
	background: #002c5f;
	color: #fff;
	margin-top: 30px;
`;