import styled from "styled-components";
import { FlexDiv } from "../../components/styled/Flex";
import Header from "../../components/header/Header";
import { useSearchParams } from "react-router-dom";
import { ModelPreview } from "../../components/ModelPreview";
import useFetchModelInit from "../../hooks/useFetchModelInit";
import { OptionArea } from "../../components/options/OptionArea";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectOptListState } from "../../utils/recoil/options";

const ContentWrap = styled(FlexDiv)`
	position: relative;
	height: 100%;
	width: auto;
	margin: 0 auto;
	overflow-x: hidden;
	justify-content: space-between;
`;

export function MakeCar() {
	const [searchParams] = useSearchParams();
	const [model, setModel] = useState({});
	const selectList = useRecoilValue(selectOptListState);
	useFetchModelInit(searchParams.get('modelId'), setModel);
	if (model) {
		searchParams.set('carCode', model.carCode);
		searchParams.set('trimCode', model.trimCode);
	}
	return (
		<div>
			<Header carCode={searchParams.get('carCode')}></Header>
			<ContentWrap>
				{ model && <ModelPreview model={model}></ModelPreview>}
				{ selectList && <OptionArea />}
			</ContentWrap>
		</div>
	);
}