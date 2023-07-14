import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FlexItem } from './styled/Flex';
import { Trim } from '../type/ApiResponseType';
import { FlexDivItemType } from '../type/styledType';

export default function TrimBox({ trim, carCode }: { trim: Trim; carCode: string }) {
  return (
    <Item textAlign="" marginTop="">
      <TrimName>{trim.trimName}</TrimName>
      <Price>{trim.price}원</Price>
      <div style={{ marginTop: '30px' }}>
        <Info>{trim.basicInfo}</Info>
      </div>
      <Link
        to={`/cars/estimation/models/making?modelId=${trim.modelId}&carCode=${carCode}&trimCode=${trim.trimCode}`}
      >
        <MakeCarBtn>
          <span>내 차 만들기</span>
        </MakeCarBtn>
      </Link>
    </Item>
  );
}

const Item = styled(FlexItem)<FlexDivItemType>`
  background: #f6f3f2;
	min-width: 200px;
`;
const TrimName = styled.h4`
  font-family: 'HyundaiSansHeadKR';
  font-size: 26px;
  letter-spacing: 0.32px;
  color: #000;
  line-height: 1;
  font-weight: 400;
  word-break: keep-all;
`;
const Price = styled.span`
  position: relative;
  display: block;
  margin-top: 8px;
  font-family: 'HyundaiSansHeadKR';
  font-size: 22px;
  letter-spacing: 0.32px;
  color: #000;
  line-height: 1;
`;
const Info = styled.b`
  font-family: 'HyundaiSansTextKR';
  color: #666;
  height: 16px;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MakeCarBtn = styled.button`
  width: 100%;
  height: 50px;
  border: 0;
  background: #002c5f;
  font-family: 'HyundaiSansTextKR';
  font-size: 16px;
  color: #fff;
  margin-top: 20px;
`;