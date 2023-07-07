import styled from "styled-components"
import { FlexUl } from "../../styled/Flex"
import { ColorBtn, DisabledBtn, OptionColor, OptionName, OptionTitle } from "../../styled/Option"
import { useRecoilState } from "recoil";
import { interiorListState, interiorState } from "../../../utils/recoil/options";
import { useEffect } from "react";
import { InteriorType } from "../../../type/optionType";

const InteriorItem = styled.li`
	margin-bottom: 25px;
	position: relative;
`;

export function Interior() {
	const [interior, setInterior] = useRecoilState(interiorState);
	const [interiorList, setInteriorList] = useRecoilState<InteriorType[]>(interiorListState);
	useEffect(() => {
		async function initInterior() {
			if (interiorList && (interior.id === undefined || interior.id === 0)) {
				setInterior({
					...interiorList[0]
				});
			}
		}
		initInterior();
	}, [interiorList.length, interiorList, interior.id, setInterior]);
	return (
		<section>
			<OptionTitle>
				<OptionName marginTop="0" textAlign="left">내장색상</OptionName>
				<OptionColor marginTop="0" textAlign="right">{interior.name}</OptionColor>
			</OptionTitle>
			<FlexUl>
				{
					interiorList.length > 0 &&
					interiorList.map((item, id) => {
						return (
							item.choiceYN === true ?
							<InteriorItem key={item.id}>
								<ColorBtn width="496px" height="75px" style={{backgroundImage:`url(${item.imgUri})`}}
									active={item.id === interior.id}
									onClick={() => {
										// 현재 선택된 외장색상 기반으로 선택 가능한 내장색인지 조회
										setInterior({
											...interiorList[id]
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
											...interiorList[id]
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