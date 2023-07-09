import { useRecoilState } from 'recoil';
import ColorChangeModal from './ColorChangeModal';
import { modalState } from '../../utils/recoil/modal';
import TrimChangeModal from './TrimChangeModal';
import { styled } from 'styled-components';

const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ModalProvider() {
  const [{ modalName, colorName, trimChangeData }, setModal] =
    useRecoilState(modalState);
  const content = {
    'CHANGE-INTERIOR': (
      <ColorChangeModal
        colorChange="interior"
        colorName={colorName || ''}
        setModal={() => setModal({ modalName: null })}
      />
    ),
    'CHANGE-EXTERIOR': (
      <ColorChangeModal
        colorChange="exterior"
        colorName={colorName || ''}
        setModal={() => setModal({ modalName: null })}
      />
    ),
    'CHANGE-TRIM': (
      <TrimChangeModal
        colorName={colorName || ''}
        setModal={() => setModal({ modalName: null })}
        data={trimChangeData || {}}
      />
    ),
  };
  return <ModalWrap>{modalName && content[modalName]}</ModalWrap>;
}

export default ModalProvider;
