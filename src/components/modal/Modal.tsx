import { ReactNode } from 'react';
import { CloseBtn, ModalBackground, ModalContainer } from '../styled/Modal';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../utils/recoil/modal';

function Modal({ children }: { children: ReactNode }) {
	const setModal = useSetRecoilState(modalState);
	console.log(children)
  return (
    <>
      <ModalBackground />
      <ModalContainer width="700px" height="">
        <CloseBtn onClick={() => setModal({ modalName: null })}>X</CloseBtn>
        {children}
      </ModalContainer>
    </>
  );
}

export default Modal;
