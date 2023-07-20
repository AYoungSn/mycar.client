import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChangeOptionType } from "../../type/ApiResponseType";
import { PopupHeader } from "../styled/Modal";
import Modal from "./Modal";
import ChangeOptionList from "./options/ChangeOptionList";
import { detailOptListState, detailOptState } from "../../utils/recoil/options";
import ChangePrice from "./options/ChangePrice";
import { optionUpdate } from "../../utils/optionUpdate";
import BottomGroupBtn from "./BottomGroupBtn";

export default function OptionChangeModal({
	detail,
	changeOptionData
}: {
	detail: string,
	changeOptionData: ChangeOptionType
}) {
	let change = '';
	let afterOption = '';
	let changePrice = 0;
	for (let i = 0; i < changeOptionData.addOptions.length; i++) {
		if (changeOptionData.addOptions[i].code !== detail) {
			change = 'add';
			afterOption = changeOptionData.addOptions[i].name;
		}
		changePrice += changeOptionData.addOptions[i].price;
	}
	for (let i = 0; i < changeOptionData.delOptions.length; i++) {
		if (changeOptionData.delOptions[i].code !== detail) {
			change = 'del';
			afterOption = changeOptionData.delOptions[i].name;
		}
		changePrice -= changeOptionData.delOptions[i].price;
	}
	const detailOptionList = useRecoilValue(detailOptListState);
	const setDetailOpts = useSetRecoilState(detailOptState);
	return (<Modal>
		<div>
			<PopupHeader>
				<h3>{detailOptionList.get(detail)?.name} 은 {afterOption} {change === 'del' ? '삭제' : '추가'} 후 선택 가능합니다.</h3>
			</PopupHeader>
			{changeOptionData.addOptions.length > 0 && <ChangeOptionList change='add' optionList={changeOptionData.addOptions} />}
			{changeOptionData.delOptions.length > 0 && <ChangeOptionList change="del" optionList={changeOptionData.delOptions} />}
			<ChangePrice changePrice={changePrice} />
			<BottomGroupBtn confirmHandler={() => {
				onChangeOptions(changeOptionData, setDetailOpts);
			}} />
		</div>
	</Modal>)
}

function onChangeOptions(changeOptionData: ChangeOptionType, setDetailOpts: any) {
	for (let i = 0; i < changeOptionData.addOptions.length; i++) {
		optionUpdate(changeOptionData.addOptions[i].code, false, setDetailOpts);
	}
	for (let i = 0; i < changeOptionData.delOptions.length; i++) {
		optionUpdate(changeOptionData.delOptions[i].code, true, setDetailOpts)
	}
}