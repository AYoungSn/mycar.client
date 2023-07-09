import { ReactNode } from "react";
import { CloseBtn, ModalBackground, ModalContainer } from "../styled/Modal";

function Modal({setModal, children}:{setModal: any, children: ReactNode}) {
	return (<>
		<ModalBackground />
		<ModalContainer width="700px" height="">
			<CloseBtn onClick={setModal}>X</CloseBtn>
			{children}
		</ModalContainer>
	</>)
}

export default Modal;