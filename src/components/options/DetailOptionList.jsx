import { OptionName } from "../styled/Option";
import { OptionList } from "./OptionList";

export function DetailOptionList(props) {
	console.log(props.options);
	return <div>
		<OptionName marginTop="30px">상세 품목</OptionName>
		<OptionList options={props.options} />
	</div>
}