import { styled } from "styled-components";
import { MenuBtn, Triangle } from "../styled/Head";
import { ConfirmBtn, PopupHeader } from "../styled/Modal";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { carsApi } from "../../utils/Api";
import { useRecoilValue } from "recoil";
import { modelState } from "../../utils/recoil/carInfo";
import { Trim } from "../../type/ApiResponseType";
import useFetchTrimList from "../../hooks/useFetchTrimList";
import { FlexUl } from "../styled/Flex";

const MenuWrap = styled.div`
	margin-top: 10px;
	border: 1px #AAA solid;
	min-width: 320px;
	background-color: #fff;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	box-sizing: border-box;
	width: auto;
	z-index: 200 !important;
`;

const BoxLi = styled.li`
	margin: 10px;
`;
const BoxBtn = styled.button<{active: boolean}>`
	width: 100%;
	border: ${props => props.active ? "2px solid #007fa8" : "1px #DDD solid" };
	padding: 10px;
	font-size: 16px;
	& > b {
		line-height: 20px;
	}
	& > p {
		margin-top: 10px;
	}
`;
function DropDown({carName, modelNames, setName}:{carName: string, modelNames: string[], setName: any}) {
	return (<MenuWrap>
		<ul>
			{modelNames.map((name) => {
				return (<li>
					<button style={{width: "100%"}} onClick={() => {setName(name)}}>
						{carName} {name}
					</button>
				</li>)
			})}
		</ul>
	</MenuWrap>)
}

function TrimBox({trimList, selectModel, setModel}:{trimList: Trim[], selectModel: Trim, setModel: any}) {
	return (<FlexUl style={{justifyContent: "center"}}>
		{
			trimList && trimList.map((item) => {
				return (<BoxLi>
					<BoxBtn active={selectModel.modelId === item.modelId} onClick={() => setModel(item)}>
						<b>{item.trimName}</b>
						<p>{item.price}</p>
					</BoxBtn>
				</BoxLi>)
			})
		}
	</FlexUl>)
}

export default function ModelChangeModal() {
	const [dropDown, setDropDown] = useState(false);
	const [selectName, setSelectName] = useState('');
	const [basicName, setBasicName] = useState<string[]>([]);
	const model = useRecoilValue(modelState);
	const [selectModel, setModel] = useState<Trim>({
		trimCode: '',
		trimName: '',
		basicInfo: '',
		price: 0,
		modelId: 0
	});
	useEffect(() => {
		async function fetchBasicName() {
			const names = (await carsApi.modelNames(model.carCode)).data;
			setBasicName(names.models);
			if (selectName === '') {
				setSelectName(names.models[0]);
			}
		}
		fetchBasicName();
	}, [model.carCode]);
	const trimList = useFetchTrimList(model.carCode, selectName, basicName, setModel);
	return (<Modal>
		<PopupHeader>
			<h3>변경할 모델을 선택해 주세요.</h3>
		</PopupHeader>
		<p>변경되는 모델에 따라 색상 및 사양이 변경될 수 있습니다.</p>
		<div>
			<MenuBtn onClick={() => {setDropDown(!dropDown)}}>
				<span>{model.carName} {selectName}</span>
				<Triangle isOpen={dropDown}></Triangle>
			</MenuBtn>
			{
				dropDown &&
				<DropDown carName={model.carName} modelNames={basicName} setName={setSelectName}/>
			}
		</div>
		<TrimBox trimList={trimList} selectModel={selectModel} setModel={setModel}/>
		<a href={`/cars/estimation/models/making?modelId=${selectModel.modelId}&carCode=${model.carCode}&trimCode=${selectModel.trimCode}`}>
			<ConfirmBtn>
				확인
			</ConfirmBtn>
		</a>
	</Modal>)	
}