import styled from "styled-components";
import { FlexDiv } from "../../components/styled/Flex";
import Header from "../../components/header/Header";
import { useSearchParams } from "react-router-dom";
import { ModelPreview } from "../../components/ModelPreview";
import { useFetchModelInit } from "../../hooks/useFetchModelInit";
import { OptionArea } from "../../components/options/OptionArea";
import { useState } from "react";

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
	const [model, setModel] = useState('');
	const [exterior, setExterior] = useState([]);
	const [interior, setInterior] = useState([]);
	const [options, setOptions] = useState('');
	useFetchModelInit(searchParams.get('modelId'), setModel, setExterior, setInterior, setOptions);

	return (
		<div>
			<Header carId={searchParams.get('carId')}></Header>
			<ContentWrap>
				<ModelPreview model={model}></ModelPreview>
				<OptionArea exterior={exterior} interior={interior} options={options}></OptionArea>
			</ContentWrap>
		</div>
	);
}