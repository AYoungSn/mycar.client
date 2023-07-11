import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ChangeOptionType } from "../../type/ApiResponseType";
import { PopupHeader } from "../styled/Modal";
import Modal from "./Modal";
import ChangeOptionList from "./options/ChangeOptionList";
import { selectOptListState, selectOptState } from "../../utils/recoil/options";
import ChangePrice from "./options/ChangePrice";
import { optionUpdate } from "../../utils/optionUpdate";

function onChangeOptions(changeOptionData: ChangeOptionType, setSelectOpts: any) {
	for(let i = 0; i < changeOptionData.addOptions.length;i++) {
		optionUpdate(changeOptionData.addOptions[i].code, false, setSelectOpts);
	}
	for(let i = 0; i < changeOptionData.delOptions.length;i++) {
		optionUpdate(changeOptionData.delOptions[i].code, true, setSelectOpts)
	}
}

export default function OptionChangeModal({
	selectOption, 
	changeOptionData
}:{
	selectOption: string, 
	changeOptionData: ChangeOptionType
}) {
	let change = '';
	let afterOption = '';
	let changePrice = 0;
	for(let i = 0; i < changeOptionData.addOptions.length;i++) {
		if (changeOptionData.addOptions[i].code !== selectOption) {
			change = 'add';
			afterOption = changeOptionData.addOptions[i].name;
		}
		changePrice += changeOptionData.addOptions[i].price;
	}
	for(let i = 0; i < changeOptionData.delOptions.length;i++) {
		if (changeOptionData.delOptions[i].code !== selectOption) {
			change = 'del';
			afterOption = changeOptionData.delOptions[i].name;
		}
		changePrice -= changeOptionData.delOptions[i].price;
	}
	const selectOptionList = useRecoilValue(selectOptListState);
	const setSelectOpts = useSetRecoilState(selectOptState);

	return (<Modal>
		<div>
			<PopupHeader>
				<h3>{selectOptionList.get(selectOption)?.name} 은 {afterOption} {change === 'del' ? '삭제' : '추가'} 후 선택 가능합니다.</h3>
			</PopupHeader>
			{changeOptionData.addOptions.length > 0 && <ChangeOptionList change='add' optionList={changeOptionData.addOptions} />}
			{changeOptionData.delOptions.length > 0 && <ChangeOptionList change="del" optionList={changeOptionData.delOptions} />}
			<ChangePrice changePrice={changePrice} />
			<button onClick={() => {
				onChangeOptions(changeOptionData, setSelectOpts);
			}}>
				확인
			</button>
		</div>
	</Modal>)
}