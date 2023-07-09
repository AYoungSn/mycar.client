import styled from 'styled-components';
import { FlexItem } from './styled/Flex';
import useUpdatePrice from '../hooks/useUpdatePrice';
import { Model } from '../type/ApiResponseType';
import { FlexDivItemType } from '../type/styledType';

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

export function ModelPreview({ model }: { model: Model }) {
  const price = useUpdatePrice();
  return (
    <PreviewWrap>
      <Preview marginTop="0" textAlign="none">
        <h2>
          {model.carName} - {model.trimName}
        </h2>
        <ModelName>{model.modelName}</ModelName>
        <PriceDiv>
          <PLabel>총 차량 가격</PLabel>
          <Price>{price}</Price>
        </PriceDiv>
      </Preview>
    </PreviewWrap>
  );
}
