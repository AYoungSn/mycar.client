import styled from 'styled-components';
import { FlexDivItemType } from '../../type/styledType';

export const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  grid-gap: 30px;
  gap: 30px;
`;

export const FlexItem = styled.div<FlexDivItemType>`
  position: relative;
  text-align: ${(props) => props.$textAlign};
  padding: 30px;
  height: 100%;
`;

export const FlexUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
export const FlexLiItem = styled.li`
  position: relative;
  width: 45%;
  text-align: center;
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`;

export const FlexLi = styled.li`
  display: flex;
  flex-wrap: wrap;
`;
