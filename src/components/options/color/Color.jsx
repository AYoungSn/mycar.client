import { OptionHead } from "../../styled/Option";
import { Exterior } from "./Exterior";
import { Interior } from "./Interior";

export function Color(props) {
	return (
		<div>
			<OptionHead>색상</OptionHead>
			<Exterior />
			<Interior />
		</div>
	)
}