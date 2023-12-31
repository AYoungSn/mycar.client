import styled from 'styled-components';
import { FlexDiv, FlexItem } from './Flex';
import { FlexDivItemType } from '../../type/styledType';

export const OptionHead = styled.h2`
  font-family: 'HyundaiSansHeadKR';
  font-size: 30px;
	margin-bottom: 30px;
`;

export const OptionTitle = styled(FlexDiv)`
  margin-bottom: 20px;
  justify-content: space-between;
	border-bottom: 1px solid #ccc;
`;

export const OptionName = styled(FlexItem) <FlexDivItemType>`
  font-size: 20px;
  padding: 0px;
  margin-top: ${(props) => props.$marginTop};
`;
export const OptionColor = styled(FlexItem)`
  font-size: 14px;
  float: right;
	color: #666;
`;

export const ColorBtn = styled.button<{
	width: string;
	height: string;
	$active: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => (props.$active === 'true' ? '4px solid #007fa8;' : 0)};
  cursor: pointer;
`;

export const DisabledBtn = styled.button`
  display: block;
  width: 26px;
  height: 26px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -13px;
  margin-left: -13px;
  background: transparent
    url(https://www.hyundai.com/static/images/color_alert.png) no-repeat;
  border: 0;
`;
