import styled from "styled-components";
import { FlexDiv } from "../../components/styled/FlexDiv";
import { FlexItem } from "../../components/styled/FlexItem";
import Header from "../../components/header/Header";
import { useSearchParams } from "react-router-dom";
import { ModelPreview } from "../../components/ModelPreview";
import { useFetchModelInit } from "../../hooks/useFetchModelInit";

const ContentWrap = styled(FlexDiv)`
	position: relative;
	height: 100%;
	width: auto;
	margin: 0 auto;
	overflow-x: hidden;
`;
const MakingWrap = styled(FlexDiv)`

`

const OptionArea = styled(FlexItem)`
	width:660px;
	padding: 120px 72px 120px 80px;
`
export function MakeCar() {
	const [searchParams, setSearchParmas] = useSearchParams();
	const {model, exterior, interior, options} = useFetchModelInit(searchParams.get('modelId'));

	return (
		<div>
			<Header carId={searchParams.get('carId')}></Header>
			<ContentWrap>
				<ModelPreview model={model}></ModelPreview>
				<OptionArea></OptionArea>
			</ContentWrap>
		</div>
	);
}