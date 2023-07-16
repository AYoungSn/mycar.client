import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { FlexItem } from './styled/Flex';
import useUpdatePrice from '../hooks/useUpdatePrice';
import { Model } from '../type/ApiResponseType';
import { FlexDivItemType } from '../type/styledType';
import { modalState } from '../utils/recoil/modal';
import PricePrint from '../utils/PricePrint';

export default function ModelPreview({ model }: { model: Model }) {
  const price = useUpdatePrice();
	const setModal = useSetRecoilState(modalState);
  return (
    <PreviewWrap>
      <Preview marginTop="0" textAlign="none">
        <h2>
          {model.carName} - {model.trimName}
        </h2>
        <ModelName>{model.modelName}</ModelName>
				<ModelChangeBtn onClick={() => setModal({modalName: 'CHANGE-MODEL'})}><span>모델 변경</span></ModelChangeBtn>
        <PriceDiv>
          <PLabel>총 차량 가격</PLabel>
          <Price>{PricePrint(price)}</Price>
        </PriceDiv>
      </Preview>
    </PreviewWrap>
  );
}
const PreviewWrap = styled.div`
  position: relative;
`;
const Preview = styled(FlexItem)<FlexDivItemType>`
  width: 400px;
  position: fixed;
  left: 0;
  top: 0;
  margin-top: 100px;
`;
const PriceDiv = styled.div`
  margin-top: 50px;
`;
const ModelName = styled.span`
  margin-top: 15px;
  margin-right: 40px;
  display: inline-block;
  color: #666;
`;
const PLabel = styled.span`
  display: inline-block;
  font-size: 19px;
  margin-right: 40px;
`;
const Price = styled.b`
  display: inline-block;
  font-size: 30px;
`;
const ModelChangeBtn = styled.button`
	width: auto;
	height: auto;
	color: #002c5f;
	background-color: transparent;
	border: 1px #002c5f solid;
	padding: 5px;
	font-family: "HyundaiSansTextKR";
	font-size: 16px;
	font-weight: 500;
	letter-spacing: -.4px;
	cursor: pointer;
`;