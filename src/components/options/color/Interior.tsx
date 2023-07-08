import styled from "styled-components"
import { FlexUl } from "../../styled/Flex"
import { ColorBtn, DisabledBtn, OptionColor, OptionName, OptionTitle } from "../../styled/Option"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { exteriorListState, interiorListState, interiorState, selectOptState } from "../../../utils/recoil/options";
import { useEffect } from "react";
import { ExteriorType, InteriorType } from "../../../type/optionType";
import { carsApi } from "../../../utils/Api";
import { useSearchParams } from "react-router-dom";
import MakeOptionCodeList from "../../../hooks/useMakeOptionCodeList";
import { allOptionUpdate } from "../../../utils/optionUpdate";
import useMakeOptionCodeList from "../../../hooks/useMakeOptionCodeList";

const InteriorItem = styled.li`
	margin-bottom: 25px;
	position: relative;
`;

export function Interior() {
	const [searchParams] = useSearchParams();
	const carCode = searchParams.get('carCode') || 'undefined';
	const trimCode = searchParams.get('trimCode') || 'undefined';
	const modelId = Number(searchParams.get('modelId') || '0');
	const [interior, setInterior] = useRecoilState(interiorState);
	const interiorList = useRecoilValue<InteriorType[]>(interiorListState);
	const setExteriorList = useSetRecoilState(exteriorListState);
	const [selectOpts, setSelectOpts] = useRecoilState(selectOptState);
	useEffect(() => {
		async function initInterior() {
			for(let i = 0; i < interiorList.length;i++) {
				if(interiorList[i].id === interior.id && interiorList[i].choiceYN === false) {
					for(let j = 0; j < interiorList.length;j++) {
						if (interiorList[j].choiceYN === true) {
							setInterior({...interiorList[j]});
							break;
						}
					}
					break;
				}
			}
			if (interiorList[0] && (interior.choiceYN === false)) {
				setInterior({
					...interiorList[0]
				});
				const data = (await carsApi.enableExteriorList(carCode, trimCode, interiorList[0].code)).data;
				setExteriorList(data.exterior.sort((a:ExteriorType, b:ExteriorType) => a.choiceYN === true ? -1 :(b.choiceYN === true ? (a.id > b.id ? 1 : 0) : 1)));
			}
		}
		initInterior();
	}, [interiorList]);
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
										// 현재 선택된 내장색상 기반으로 선택 가능한 외장색상 목록 update
										async function fetchExteriorList() {
											const data = (await carsApi.enableExteriorList(carCode, trimCode, item.code)).data;
											setExteriorList(data.exterior.sort((a:ExteriorType, b:ExteriorType) => a.choiceYN === true ? -1 : (b.choiceYN === true ? (a.id > b.id ? 1 : 0) : 1)));
											setInterior(item);
										}
										async function checkedOptionList() {
											const optionCodes = MakeOptionCodeList(selectOpts);
											const data = (await carsApi.checkedOptions(interior.code, optionCodes, modelId)).data;
											if (data.available === false) {
												allOptionUpdate(data.optionCode, setSelectOpts);
											}
										}
										fetchExteriorList();
										checkedOptionList();
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