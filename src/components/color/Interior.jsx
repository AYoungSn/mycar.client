import styled from "styled-components"
import { FlexUl } from "../styled/Flex"
import { ColorBtn, DisabledBtn, OptionColor, OptionName, OptionTitle } from "../styled/Option"
import { useRecoilState } from "recoil";
import { interiorState } from "../../utils/recoil/color";
import { useEffect, useState } from "react";

const InteriorItem = styled.li`
	margin-bottom: 25px;
	position: relative;
`;

export function Interior(props) {
	const [interiorId, setInteriorId] = useRecoilState(interiorState);
	const [curInterior, setCurInterior] = useState('');
	useEffect(() => {
		async function initInterior() {
			if (interiorId === undefined || interiorId === 0) {
				setInteriorId(props.data[0]?.id);
				setCurInterior(props.data[0]?.name);
			}
		}
		initInterior();
	}, [props.data.length]);
	return (
		<section>
			<OptionTitle>
				<OptionName>내장색상</OptionName>
				<OptionColor>{curInterior}</OptionColor>
			</OptionTitle>
			<FlexUl>
				{
					props.data?.sort((a, b) => a.choiceYN === true ? -1 : (b.choiceYN === true ? 0 : 1)).map((interior, id) => {
						return (
							
							interior.choiceYN === true ?
							<InteriorItem key={interior.id}>
								<ColorBtn width={"496px"} height={"75px"} style={{backgroundImage:`url(${interior.imgUri})`}}
									active={interior.id === interiorId}
									onClick={() => {
										setInteriorId(interior.id);
										setCurInterior(interior.name);
									}}/>
							</InteriorItem>
							:
							<InteriorItem key={interior.id}>
								<ColorBtn width={"496px"} height={"75px"} style={{backgroundImage:`url(${interior.imgUri})`}}
									active={interior.id === interiorId}
									onClick={() => {
										setInteriorId(interior.id);
										setCurInterior(interior.name);
									}}/>
								<DisabledBtn/>
							</InteriorItem>
							
						)
					})
				}
			</FlexUl>
		</section>
	)
}