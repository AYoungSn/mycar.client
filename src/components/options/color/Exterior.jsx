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
				// 현재 옵션 선택 시 선택 가능한 내장색상 목록 조회
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
										// 현재 선택된 내장색상 기반으로 선택 가능한 외장색상인지
										setExterior({
											id: props.data[id]?.id,
											name: props.data[id]?.name,
											price: props.data[id]?.price
										});
										// 선택된 외장색상의 가격을 priceState 에 추가
										// 선택한 외장색상 기반으로 내장 색상 목록 재요청
										// -> 기존 내장 색상이 선택 불가한 경우 선택가능한 색상으로 변경
									}}/>
							</ExteriorItem>
						)
					})
				}
			</FlexUl>
		</section>
	)
}