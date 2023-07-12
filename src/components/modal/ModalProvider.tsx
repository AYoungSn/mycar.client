import { useRecoilState } from 'recoil';
import ColorChangeModal from './ColorChangeModal';
import { modalState } from '../../utils/recoil/modal';
import TrimChangeModal from './TrimChangeModal';
import { styled } from 'styled-components';
import OptionChangeModal from './OptionChangeModal';
import SummaryViewModal from './SummaryViewModal';
import ModelChangeModal from './ModelChangeModal';

const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ModalProvider() {
  const [{ 
		modalName, 
		colorName, 
		trimChangeData,
		detail,
		changeOptionData,
	}, setModal] =
    useRecoilState(modalState);
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
				changeOptionData={changeOptionData || {delOptions: [], addOptions: []}} 
			/>
		),
		'SUMMARY': (
			<SummaryViewModal />
		),
		'CHANGE-MODEL': (<ModelChangeModal />)
  };
  return <ModalWrap>{modalName && content[modalName]}</ModalWrap>;
}

export default ModalProvider;
