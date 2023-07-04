import styled from "styled-components"
import { FlexUl } from "../../styled/Flex"
import { ColorBtn, DisabledBtn, OptionColor, OptionName, OptionTitle } from "../../styled/Option"
import { useRecoilState } from "recoil";
import { interiorState } from "../../../utils/recoil/options";
import { useEffect, useState } from "react";

const InteriorItem = styled.li`
	margin-bottom: 25px;
	position: relative;
`;

export function Interior(props) {
	const [interior, setInterior] = useRecoilState(interiorState);
	useEffect(() => {
		async function initInterior() {
			if (interior.id === undefined || interior.id === 0) {
				setInterior({
					id: props.data[0]?.id,
					name: props.data[0]?.name,
					price: props.data[0]?.price
				});
			}
		}
		initInterior();
	}, [props.data.length]);
	return (
		<section>
			<OptionTitle>
				<OptionName>내장색상</OptionName>
				<OptionColor>{interior.name}</OptionColor>
			</OptionTitle>
			<FlexUl>
				{
					props.data?.sort((a, b) => a.choiceYN === true ? -1 : (b.choiceYN === true ? 0 : 1))
						.map((item, id) => {
						return (
							item.choiceYN === true ?
							<InteriorItem key={item.id}>
								<ColorBtn width={"496px"} height={"75px"} style={{backgroundImage:`url(${item.imgUri})`}}
									active={item.id === interior.id}
									onClick={() => {
										setInterior({
											id: props.data[id]?.id,
											name: props.data[id]?.name,
											price: props.data[id]?.price
										});
									}}/>
							</InteriorItem>
							:
							<InteriorItem key={item.id}>
								<ColorBtn width={"496px"} height={"75px"} style={{backgroundImage:`url(${item.imgUri})`}}
									active={item.id === interior.id}
									onClick={() => {
										setInterior({
											id: props.data[id]?.id,
											name: props.data[id]?.name,
											price: props.data[id]?.price
										});
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