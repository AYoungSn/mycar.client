import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MenuBtn, Triangle } from "../styled/Head";
import { PopupHeader } from "../styled/Modal";
import { FlexUl } from "../styled/Flex";
import Modal from "./Modal";
import { modelState } from "../../utils/recoil/carInfo";
import { modalState } from "../../utils/recoil/modal";
import PricePrint from "../../utils/PricePrint";
import useFetchTrimList from "../../hooks/useFetchTrimList";
import ChangeOptionList from "./options/ChangeOptionList";
import ChangePrice from "./options/ChangePrice";
import { Trim } from "../../type/ApiResponseType";
import BottomGroupBtn from "./BottomGroupBtn";
import useBasicName from "../../hooks/modal/useBasicName";
import useFetchDelOptionTrimChange from "../../hooks/modal/useFetchDelOptionTrimChange";

export default function ModelChangeModal() {
	const navigate = useNavigate();
	const setModal = useSetRecoilState(modalState);
	const [dropDown, setDropDown] = useState(false);
	const [selectName, setSelectName] = useState('');
	const [basicName, setBasicName] = useState<string[]>([]);
	const model = useRecoilValue(modelState);
	const [selectModel, setSelectModel] = useState<Trim>({
		trimCode: '',
		trimName: '',
		basicInfo: '',
		price: 0,
		modelId: 0
	});
	useBasicName(setBasicName, selectName, setSelectName);
	const { delOptions, delPrice } = useFetchDelOptionTrimChange(selectName, selectModel);
	const trimList = useFetchTrimList(model.carCode, selectName, basicName, setSelectModel);
	return (<Modal>
		<PopupHeader>
			<h3>변경할 모델을 선택해 주세요.</h3>
		</PopupHeader>
		<p>변경되는 모델에 따라 색상 및 사양이 변경될 수 있습니다.</p>
		<div>
			<MenuBtn onClick={() => { setDropDown(!dropDown) }}>
				<span>{model.carName} {selectName}</span>
				<Triangle $isOpen={dropDown}></Triangle>
			</MenuBtn>
			{
				dropDown &&
				<DropDown carName={model.carName} modelNames={basicName} setName={setSelectName} setDropDown={() => setDropDown(false)} />
			}
		</div>
		<TrimBox trimList={trimList} selectModel={selectModel} setModel={setSelectModel} />
		{(delOptions.length || 0) > 0 && (
			<ChangeOptionList change='del' optionList={delOptions || null} />
		)}
		{selectModel.modelId !== 0 && selectModel.modelId !== model.modelId && (
			<ChangePrice changePrice={(selectModel.price &&
				selectModel.price -
				model.price -
				delPrice) || 0} />
		)}
		<BottomGroupBtn confirmHandler={() => {
			navigate(`/cars/estimation/models/making?modelId=${selectModel.modelId}&carCode=${model.carCode}&trimCode=${selectModel.trimCode}`);
			setModal({ modalName: null });
		}} />
	</Modal>)
}

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
const BoxBtn = styled.button<{ $active: boolean }>`
	width: 100%;
	border: ${props => props.$active ? "2px solid #007fa8" : "1px #DDD solid"};
	padding: 10px;
	font-size: 16px;
	& > b {
		line-height: 20px;
	}
	& > p {
		margin-top: 10px;
	}
`;
function DropDown({ carName, modelNames, setName, setDropDown }: { carName: string, modelNames: string[], setName: any, setDropDown: any }) {
	return (<MenuWrap>
		<ul>
			{modelNames.map((name) => {
				return (<li key={name}>
					<button style={{ width: "100%" }}
						onClick={() => {
							setName(name);
							setDropDown();
						}}
					>
						{carName} {name}
					</button>
				</li>)
			})}
		</ul>
	</MenuWrap>)
}

function TrimBox({ trimList, selectModel, setModel }: { trimList: Trim[], selectModel: Trim, setModel: any }) {
	return (<FlexUl style={{ justifyContent: "center" }}>
		{
			trimList && trimList.map((item) => {
				return (<BoxLi key={item.modelId}>
					<BoxBtn $active={selectModel.modelId === item.modelId} onClick={() => setModel(item)}>
						<b>{item.trimName}</b>
						<p>{PricePrint(item.price)}</p>
					</BoxBtn>
				</BoxLi>)
			})
		}
	</FlexUl>)
}