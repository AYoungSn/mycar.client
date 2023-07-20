import { useSetRecoilState } from "recoil";
import { TuixOptions } from "../../type/ApiResponseType";
import BottomGroupBtn from "./BottomGroupBtn";
import Modal from "./Modal";
import ChangeOptionList from "./options/ChangeOptionList";
import { detailOptState, hgaOptState, npfOptState } from "../../utils/recoil/options";
import { optionUpdate } from "../../utils/optionUpdate";
import ChangePrice from "./options/ChangePrice";

export default function DelOptionModal({ delOptions, detailOption }
	: { delOptions: TuixOptions, detailOption: string }) {
	const delList = delOptions.hga.length > 0 ? delOptions.hga : delOptions.npf;
	const price = delList.map((value) => value.price).reduce((acc, cur) => acc + cur, 0);
	const setDetailOpts = useSetRecoilState(detailOptState);
	const setHgaOpts = useSetRecoilState(hgaOptState);
	const setNpfOpts = useSetRecoilState(npfOptState);
	return (<Modal>
		<ChangeOptionList change="del" optionList={delList} />
		<ChangePrice changePrice={(-price) || 0} />
		<BottomGroupBtn confirmHandler={() => {
			optionUpdate(detailOption, true, setDetailOpts);
			if (delOptions.hga.length > 0) {
				delOptions.hga.forEach((value) => {
					optionUpdate(value.code, true, setHgaOpts);
				})
			} else {
				delOptions.npf.forEach((value) => {
					optionUpdate(value.code, true, setNpfOpts);
				})
			}
		}} />
	</Modal>);
}