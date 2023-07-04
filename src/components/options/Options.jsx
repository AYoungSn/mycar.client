import { OptionHead, OptionName } from "../styled/Option";
import { OptionList } from "./OptionList";

function OptionItemList(props) {
	return <div>
		<OptionName marginTop="30px">{props.name}</OptionName>
		<OptionList options={props.options} />
	</div>
}

export function Options(props) {
	console.log('options:', props.options);
	return <div>
		<OptionHead>옵션</OptionHead>
		<OptionItemList options={props.options.select} 
			name="상세 품목"/>
		{
			props.options.hga?.length > 0 && 
				<OptionItemList 
					options={props.options.hga}
					name="H Genuine Accessories" 
				/>
		}
		{
			props.options.npf?.length > 0 &&
				<OptionItemList 
					options={props.options.npf} 
					name="N Performance Parts"
				/>
		}
	</div>
}