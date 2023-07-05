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

export function Interior({ data }) {
	const [interior, setInterior] = useRecoilState(interiorState);
	useEffect(() => {
		async function initInterior() {
			if (interior.id === undefined || interior.id === 0) {
				setInterior({
					...data[0]
				});
			}
		}
		initInterior();
	}, [data.length]);
	return (
		<section>
			<OptionTitle>
				<OptionName>내장색상</OptionName>
				<OptionColor>{interior.name}</OptionColor>
			</OptionTitle>
			<FlexUl>
				{
					data?.sort((a, b) => a.choiceYN === true ? -1 : (b.choiceYN === true ? 0 : 1))
						.map((item, id) => {
						return (
							item.choiceYN === true ?
							<InteriorItem key={item.id}>
								<ColorBtn width={"496px"} height={"75px"} style={{backgroundImage:`url(${item.imgUri})`}}
									active={item.id === interior.id}
									onClick={() => {
										// 현재 선택된 외장색상 기반으로 선택 가능한 내장색인지 조회
										setInterior({
											...data[id]
										});
										// price 변경
										// 외장색상 목록 재요청
										// -> 기존 외장 색상이 선택 불가한 경우 선택가능한 색상으로 변경
									}}/>
							</InteriorItem>
							:
							<InteriorItem key={item.id}>
								<ColorBtn width={"496px"} height={"75px"} style={{backgroundImage:`url(${item.imgUri})`}}
									active={item.id === interior.id}
									onClick={() => {
										setInterior({
											...data[id]
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