import { useSetRecoilState } from "recoil";
import { CanceledBtn, ConfirmBtn } from "../styled/Modal";
import { modalState } from "../../utils/recoil/modal";

export default function BottomGroupBtn({ confirmHandler }: { confirmHandler: any }) {
	const setModal = useSetRecoilState(modalState);
	return (<div>
		<CanceledBtn onClick={() => setModal({ modalName: null })}>취소</CanceledBtn>
		<ConfirmBtn onClick={() => confirmHandler()}>
			확인
		</ConfirmBtn>
	</div>
	)
}