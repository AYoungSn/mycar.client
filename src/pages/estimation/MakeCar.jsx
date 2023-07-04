import styled from "styled-components";
import { FlexDiv } from "../../components/styled/Flex";
import Header from "../../components/header/Header";
import { useSearchParams } from "react-router-dom";
import { ModelPreview } from "../../components/ModelPreview";
import { useFetchModelInit } from "../../hooks/useFetchModelInit";
import { OptionArea } from "../../components/OptionArea";

const ContentWrap = styled(FlexDiv)`
	position: relative;
	height: 100%;
	width: auto;
	margin: 0 auto;
	overflow-x: hidden;
	justify-content: space-between;
`;


export function MakeCar() {
	const [searchParams, setSearchParmas] = useSearchParams();
	const {model, exterior, interior, options} = useFetchModelInit(searchParams.get('modelId'));

	return (
		<div>
			<Header carId={searchParams.get('carId')}></Header>
			<ContentWrap>
				<ModelPreview model={model}></ModelPreview>
				<hr/>
				<OptionArea exterior={exterior} interior={interior}></OptionArea>
			</ContentWrap>
		</div>
	);
}