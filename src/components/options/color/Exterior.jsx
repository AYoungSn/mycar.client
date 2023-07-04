import styled from "styled-components";
import { ColorBtn, OptionColor, OptionName, OptionTitle } from "../../styled/Option";
import { FlexUl } from "../../styled/Flex";
import { exteriorState } from "../../../utils/recoil/options";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

const ExteriorItem = styled.li`
	margin: 8px;
`;

export function Exterior(props) {
	const [exterior, setExterior] = useRecoilState(exteriorState);
	useEffect(() => {
		async function initExterior() {
			if (exterior.id === undefined || exterior.id === 0) {
				setExterior({
					id: props.data[0]?.id,
					name: props.data[0]?.name,
					price: props.data[0]?.price
				});
			}
		}
		initExterior();
	}, [props.data.length]);
	return (
		<section>
			<OptionTitle>
				<OptionName>외장색상</OptionName>
				<OptionColor>{exterior.name}</OptionColor>
			</OptionTitle>
			<FlexUl>
				{
					props.data?.map((ext, id) => {
						return (
							<ExteriorItem key={ext.id}>
								<ColorBtn width={"85px"} height={"85px"} style={{backgroundImage:`url(${ext.imgUri})`}}
									active={ext.id === exterior.id}
									onClick={() => {
										setExterior({
											id: props.data[id]?.id,
											name: props.data[id]?.name,
											price: props.data[id]?.price
										});
									}}/>
							</ExteriorItem>
						)
					})
				}
			</FlexUl>
		</section>
	)
}