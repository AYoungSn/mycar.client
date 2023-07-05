import { OptionHead, OptionName } from "../styled/Option";
import { OptionList } from "./OptionList";

function OptionItemList(props) {
	return <div>
		<OptionName marginTop="30px">{props.name}</OptionName>
		<OptionList options={props.options} />
	</div>
}

export function Options({options, onChange}) {
	return <div>
		<OptionHead>옵션</OptionHead>
		<OptionItemList options={options.select} 
			name="상세 품목" onChange={(id) => {
				// 현재 선택된 옵션들을 바탕으로 선택 가능한 항목인지 조회
				// 선택 시 중복 선택 불가한 다른 상세품목이 있는지 조회
				// 현재 옵션 선택 시 같이 선택되어야 하는 옵션이 있는지
				// 옵션 선택 시 hga, npf 옵션 목록 재요청
				
			}}/>
		{
			options.hga?.length > 0 && 
				<OptionItemList 
					options={options.hga}
					name="H Genuine Accessories" 
					onChange={(id) => {
						// 해당 옵션 선택시 가격 변경
					}}
				/>
		}
		{
			options.npf?.length > 0 &&
				<OptionItemList 
					options={options.npf} 
					name="N Performance Parts"
					onChange={() => {
						// 현재 선택된 옵션을 기반으로 선택 가능한 항목인지 조회
						// 옵션 선택 시 선택 불가한 다른 항목 조회
					}}
				/>
		}
	</div>
}