import { useSetRecoilState } from 'recoil';
import { ColorModalPropsType } from '../../type/ModalType';
import { ConfirmBtn } from '../styled/Modal';
import Modal from './Modal';
import { modalState } from '../../utils/recoil/modal';

function ColorChangeModal(props: ColorModalPropsType) {
	const inex = props.colorChange === 'exterior' ? '외' : '내';
	const setModal = useSetRecoilState(modalState);
	return (
		<Modal>
			<span style={{ lineHeight: "32px", fontSize: "16px" }}>
				{props.colorName}은 선택하신 {inex}장색과 함께 제공되지 않는 색상입니다.
				<br />
				{inex}장색을 변경해주세요.
			</span>
			<div>
				<ConfirmBtn onClick={() => setModal({ modalName: null })}>확인</ConfirmBtn>
			</div>
		</Modal>
	);
}

export default ColorChangeModal;
