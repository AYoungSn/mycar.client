import styled from "styled-components";
import { ColorBtn, DisabledBtn, OptionColor, OptionName, OptionTitle } from "../../styled/Option";
import { FlexUl } from "../../styled/Flex";
import { exteriorListState, exteriorState, interiorListState, interiorState } from "../../../utils/recoil/options";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ExteriorType, InteriorType } from "../../../type/optionType";
import { carsApi } from "../../../utils/Api";

const ExteriorItem = styled.li`
	margin: 8px;
	position: relative;
`;

export function Exterior() {
	const [searchParams] = useSearchParams();
	const [exterior, setExterior] = useRecoilState(exteriorState);
	const exteriorList = useRecoilValue<ExteriorType[]>(exteriorListState);
	const setInteriorList = useSetRecoilState(interiorListState);
	const carCode = searchParams.get('carCode') || 'undefined';
	const trimCode = searchParams.get('trimCode') || 'undefined';

	useEffect(() => {
		function initExterior() {
			for(let i = 0; i < exteriorList.length;i++) {
				if(exteriorList[i].id === exterior.id && exteriorList[i].choiceYN === false) {
					for(let j = 0; j < exteriorList.length;j++) {
						if (exteriorList[j].choiceYN === true) {
							setExterior({...exteriorList[j]});
						}
					}
				}
			}
			if (exteriorList[0] && exterior.choiceYN === false) {
				// 현재 옵션 선택 시 선택 가능한 내장색상 목록 조회
				setExterior({
					...exteriorList[0]
				});
			}
		}
		initExterior();
	}, [exteriorList]);
	return (
		<section>
			<OptionTitle>
				<OptionName marginTop="0" textAlign="left">외장색상</OptionName>
				<OptionColor marginTop="0" textAlign="right">{exterior.name}</OptionColor>
			</OptionTitle>
			<FlexUl>
				{
					exteriorList?.map((ext:ExteriorType, id: number) => {
						return (
							ext.choiceYN === true ?
							<ExteriorItem key={ext.id}>
								<ColorBtn width={"85px"} height={"85px"} style={{backgroundImage:`url(${ext.imgUri})`}}
									active={ext.id === exterior.id ? true : false}
									onClick={() => {
										// 현재 선택된 내장색상 기반으로 선택 가능한 외장색상인지
										async function fetchInteriorList() {
											const data = (await carsApi.enableInteriorList(carCode, trimCode, ext.code)).data;
											setInteriorList(data.interior.sort((a :InteriorType, b: InteriorType) => a.choiceYN === true ? -1 : (b.choiceYN === true ? 0 : 1)));
											setExterior(ext);
										}
										fetchInteriorList();
										// 선택된 외장색상의 가격을 priceState 에 추가
										// 선택한 외장색상 기반으로 내장 색상 목록 재요청
										
										// -> 기존 내장 색상이 선택 불가한 경우 선택가능한 색상으로 변경
									}}
									/>
							</ExteriorItem>
							:
							<ExteriorItem key={ext.id}>
								<ColorBtn width={"85px"} height={"85px"} style={{backgroundImage:`url(${ext.imgUri})`}}
									active={ext.id === exterior.id ? true : false}
									onClick={() => {
										// 현재 선택된 내장색상 기반으로 선택 가능한 외장색상인지
										setExterior({
											...exteriorList[id]
										});
										// 선택된 외장색상의 가격을 priceState 에 추가
										// 선택한 외장색상 기반으로 내장 색상 목록 재요청
										// -> 기존 내장 색상이 선택 불가한 경우 선택가능한 색상으로 변경
									}}/>
								<DisabledBtn/>
							</ExteriorItem>
						)
					})
				}
			</FlexUl>
		</section>
	)
}