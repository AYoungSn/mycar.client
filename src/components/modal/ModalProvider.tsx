import { useRecoilValue } from 'recoil';
import ColorChangeModal from './ColorChangeModal';
import { modalState } from '../../utils/recoil/modal';
import TrimChangeModal from './TrimChangeModal';
import { styled } from 'styled-components';
import OptionChangeModal from './OptionChangeModal';
import SummaryViewModal from './SummaryViewModal';
import ModelChangeModal from './ModelChangeModal';
import DelOptionModal from './DelOptionModal';

function ModalProvider() {
	const {
		modalName,
		colorName,
		trimChangeData,
		detail,
		changeOptionData,
		delOptions,
		detailOption
	} = useRecoilValue(modalState);
	const content = {
		'CHANGE-INTERIOR': (
			<ColorChangeModal
				colorChange="interior"
				colorName={colorName || ''}
			/>
		),
		'CHANGE-EXTERIOR': (
			<ColorChangeModal
				colorChange="exterior"
				colorName={colorName || ''}
			/>
		),
		'CHANGE-TRIM': (
			<TrimChangeModal
				colorName={colorName || ''}
				data={trimChangeData || {}}
			/>
		),
		'CHANGE-OPTION': (
			<OptionChangeModal
				detail={detail || ''}
				changeOptionData={changeOptionData || { delOptions: [], addOptions: [] }}
			/>
		),
		'SUMMARY': (
			<SummaryViewModal />
		),
		'CHANGE-MODEL': (<ModelChangeModal />),
		'DEL-TUIX': (<DelOptionModal delOptions={delOptions || { hga: [], npf: [] }} detailOption={detailOption || 'null'} />)
	};
	return (<>{modalName && <ModalWrap $isOpen={modalName?.length > 0}>{modalName && content[modalName]}</ModalWrap>}</>);
}

export default ModalProvider;

const ModalWrap = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
	position: ${props => props.$isOpen ? "fixed" : "relative"};
	left: ${props => props.$isOpen ? "0" : ""};
	right: 0;
	top: 0;
	bottom: 0;
	z-index: ${props => props.$isOpen ? "10" : ""};
	overflow: auto;
`;