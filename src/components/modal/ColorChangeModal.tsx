import { ColorModalPropsType } from "../../type/ModalType";
import Modal from "./Modal";

function ColorChangeModal(props:ColorModalPropsType) {
	const inex = props.colorChange === 'exterior' ? '외' : '내';
	const closeModal = () => {
		props.setModal(false);
	}
	return (<Modal setModal={closeModal}>
			<span>
				{props.colorName}은 선택하신 {inex}장색과 함께 제공되지 않는 색상입니다.
				<br/>
				{inex}장색을 변경해주세요.
			</span>
		</Modal>
		)
}

export default ColorChangeModal;