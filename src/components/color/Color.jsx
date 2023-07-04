import { useState } from "react";
import { OptionHead } from "../styled/Option";
import { Exterior } from "./Exterior";
import { useRecoilState } from "recoil";
import { exteriorState, interiorState } from "../../utils/recoil/color";

export function Color(props) {
	const [curExterior, setCurExterior] = useRecoilState(exteriorState);
	const [curInterior, setCurInterior] = useRecoilState(interiorState);
	return (
		<div>
			<OptionHead>색상</OptionHead>
			<Exterior data={props.exterior} cur={curExterior}
				onChange={(id) => {
					setCurExterior(id);
				}}/>
		</div>
	)
}