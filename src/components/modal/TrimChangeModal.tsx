import { styled } from 'styled-components';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FlexLiItem, FlexUl } from '../styled/Flex';
import { PopupHeader } from '../styled/Modal';
import { TrimChangeModalDataType } from '../../type/ApiResponseType';
import ChangeOptionList from './options/ChangeOptionList';
import ChangePrice from './options/ChangePrice';
import { modalState } from '../../utils/recoil/modal';
import { detailOptState, exteriorState, interiorListState, interiorState } from '../../utils/recoil/options';
import { optionUpdate } from '../../utils/optionUpdate';
import PricePrint from '../../utils/PricePrint';
import BottomGroupBtn from './BottomGroupBtn';

export default function TrimChangeModal({
	colorName,
	data,
}: {
	colorName: string;
	data: TrimChangeModalDataType;
}) {
	const navigate = useNavigate();
	const setModal = useSetRecoilState(modalState);
	const setDetailOpts = useSetRecoilState(detailOptState);
	const interiorList = useRecoilValue(interiorListState);
	const setInterior = useSetRecoilState(interiorState);
	const [exterior, setExterior] = useRecoilState(exteriorState);
	const trimChange = () => {
		navigate(`/cars/estimation/models/making?modelId=${data.changeTrimInfo?.changeModelId}&carCode=${data.changeTrimInfo?.changeCarCode}&trimCode=${data.changeTrimInfo?.changeTrimCode}`);
		setModal({ modalName: null });
		const findInterior = interiorList.filter((value) => value.code === data.changeTrimInfo?.interiorCode);
		setInterior({ ...findInterior[0], choiceYn: true });
		setExterior(exterior);
		data.changeOptionInfo?.addOptions.forEach((item) => {
			optionUpdate(item.code, false, setDetailOpts);
		});
		data.changeOptionInfo?.delOptions.forEach((item) => {
			optionUpdate(item.code, true, setDetailOpts);
		});
		// navigate(`/cars/estimation/models/making?modelId=${data.changeTrimInfo?.changeModelId}&carCode=${data.changeTrimInfo?.changeCarCode}&trimCode=${data.changeTrimInfo?.changeTrimCode}`);
	}
	const addPrice = data.changeOptionInfo?.addOptions
		.map((value) => value.price)
		.reduce((acc, cur) => acc + cur, 0) || 0;
	const delPrice = data.changeOptionInfo?.delOptions
		.map((value) => value.price)
		.reduce((acc, cur) => acc + cur, 0) || 0;
	return (
		<Modal>
			<div>
				<PopupHeader>
					<h3>{colorName}색상은 트림 변경 후 선택 가능합니다.</h3>
				</PopupHeader>
				<div>
					<p>트림을 변경하시겠습니까?</p>
					<TrimWrap>
						<FlexTrim>
							<TrimBox title='현재 트림'
								trimName={data.changeTrimInfo?.beforeTrimName || 'null'}
								price={data.changeTrimInfo?.beforeCarPrice || 0} />
							<TrimBox title='변경 트림'
								trimName={data.changeTrimInfo?.changeTrimName || 'null'}
								price={data.changeTrimInfo?.changeCarPrice || 0} />
						</FlexTrim>
						{(data.changeOptionInfo?.addOptions.length || 0) > 0 && (
							<ChangeOptionList change='add' optionList={data.changeOptionInfo?.addOptions || null} />
						)}
						{(data.changeOptionInfo?.delOptions.length || 0) > 0 && (
							<ChangeOptionList change='del' optionList={data.changeOptionInfo?.delOptions || null} />
						)}
						<ChangePrice changePrice={(data.changeTrimInfo?.changeCarPrice &&
							data.changeTrimInfo?.changeCarPrice -
							data.changeTrimInfo.beforeCarPrice +
							addPrice -
							delPrice) || 0} />
						<BottomGroupBtn confirmHandler={trimChange} />
						{/* <ConfirmBtn onClick={trimChange}>확인</ConfirmBtn> */}
					</TrimWrap>
				</div>
			</div>
		</Modal>
	);
}
const TrimWrap = styled.div`
  overflow: hidden;
  margin-bottom: 30px;
  & > ul > li > div {
    padding: 25px 40px;
    background: #f6f3f2;
  }
  & > ul > li > b {
    display: inline-block;
    margin: 30px 0;
  }
`;

const FlexTrim = styled(FlexUl)`
  justify-content: space-between;
  font-family: 'HyundaiSansTextKR';
  font-size: 16px;
  margin-bottom: 20px;
`;

function TrimBox({ title, trimName, price }: { title: string; trimName: string; price: number }) {
	return (
		<FlexLiItem>
			<b>{title}</b>
			<div>
				<p>{trimName}</p>
				<p>{PricePrint(price)}</p>
			</div>
		</FlexLiItem>
	);
}