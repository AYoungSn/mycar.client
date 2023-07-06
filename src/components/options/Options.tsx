import { useRecoilState } from "recoil";
import { OptionHead, OptionName } from "../styled/Option";
import { OptionList } from "./OptionList";
import { hgaOptListState, hgaOptState, npfOptListState, npfOptState, selectOptListState, selectOptState } from "../../utils/recoil/options";
import { optionUpdate } from "../../utils/optionUpdate";

function OptionItemList(props) {
	return <div>
		<OptionName marginTop="30px">{props.name}</OptionName>
		<OptionList 
			options={props.options} 
			curOptions={props.curOptions}
			onChange={props.onChange} />
	</div>
}

export function Options() {
	const [selectListOpts, setSelectListOpts] = useRecoilState(selectOptListState);
	const [selectOpts, setSelectOpts] = useRecoilState(selectOptState);
	const [hgaListOpts, setHgaListOpts] = useRecoilState(hgaOptListState);
	const [hgaOpts, setHgaOpts] = useRecoilState(hgaOptState);
	const [npfListOpts, setNpfListOpts] = useRecoilState(npfOptListState);
	const [npfOpts, setNpfOpts] = useRecoilState(npfOptState);
	return <div>
		<OptionHead>옵션</OptionHead>
		<OptionItemList options={selectListOpts} curOptions={selectOpts}
			name="상세 품목" onChange={(key) => {
				// 현재 선택된 옵션들을 바탕으로 선택 가능한 항목인지 조회
				// 선택 시 중복 선택 불가한 다른 상세품목이 있는지 조회
				// 현재 옵션 선택 시 같이 선택되어야 하는 옵션이 있는지
				// 옵션 선택 시 hga 옵션 목록 재요청
				optionUpdate(key, selectOpts.get(key), setSelectOpts);
			}}/>
		{
			hgaListOpts?.length > 0 && 
				<OptionItemList 
					options={hgaListOpts} curOptions={hgaOpts}
					name="H Genuine Accessories" 
					onChange={(key) => {
						// 해당 옵션 선택시 가격 변경
						optionUpdate(key, hgaOpts.get(key), setHgaOpts);
					}}
				/>
		}
		{
			npfListOpts?.length > 0 &&
				<OptionItemList 
					options={npfListOpts} curOptions={npfOpts}
					name="N Performance Parts"
					onChange={(key) => {
						// 현재 선택된 옵션을 기반으로 선택 가능한 항목인지 조회
						// 옵션 선택 시 선택 불가한 다른 항목 조회
						optionUpdate(key, npfOpts.get(key), setNpfOpts);
					}}
				/>
		}
	</div>
}