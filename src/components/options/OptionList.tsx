import styled from 'styled-components';
import { FlexLi, FlexUl } from '../styled/Flex';
import { FlexLiType } from '../../type/styledType';
import { OptionChoiceType } from '../../type/optionType';
import { useEffect } from 'react';

const OptionWrap = styled(FlexUl)`
  flex: flex-wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 30px;
`;
const Item = styled(FlexLi)<FlexLiType>`
  position: relative;
  width: 237px;
  height: 130px;
  flex-direction: column;
  border: ${(props) => (props.active ? '1px solid #007fa8' : '1px solid #ccc')};
  color: #000;
  margin-right: 10px;
  margin-bottom: 30px;
  overflow: hidden;
  background: ${(props) => (props.choiceYN === true ? '#FFF' : '#AAA')};
`;
const OptionBtn = styled.button`
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 10px;
`;

function OptionItem({
  option,
  curOptions,
  onChange,
}: {
  option: OptionChoiceType | null;
  curOptions: Map<string, boolean>;
  onChange: any;
}) {
  return ( option &&
    <Item
      active={curOptions?.get(option.code) === true}
      choiceYN={option.choiceYN}
      key={option.code}
    >
      <OptionBtn
        onClick={() => {
          onChange(option.code);
        }}
      >
        <label>
          <div>
            <p>{option.name}</p>
          </div>
          <div>
            <p>{option.price}</p>
          </div>
        </label>
      </OptionBtn>
    </Item>
  );
}

export function OptionList({
  options,
  curOptions,
  onChange,
	disableOnChange,
}: {
  options: Map<string, OptionChoiceType>;
  curOptions: Map<string, boolean>;
  onChange: any;
	disableOnChange: any;
}) {
  return (
    <OptionWrap>
      {
				[...options].map(([key, value]) => {
          return (
            <OptionItem
              option={value}
              curOptions={curOptions}
              onChange={value.choiceYN === true ? onChange : disableOnChange}
            />
          );
        })
			}
    </OptionWrap>
  );
}
