import { OptionHead } from "../styled/Option";
import { DetailOptionList } from "./DetailOptionList";

export function Options(props) {
	console.log("Options", props.options);
	return <div>
		<OptionHead>옵션</OptionHead>
		<DetailOptionList options={props.options.select}/>
	</div>
}