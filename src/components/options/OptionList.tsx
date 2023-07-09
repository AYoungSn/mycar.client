import styled from 'styled-components';
import { FlexLi, FlexUl } from '../styled/Flex';
import { FlexLiType } from '../../type/styledType';
import { OptionChoiceType } from '../../type/optionType';

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
  option: OptionChoiceType;
  curOptions: Map<string, boolean>;
  onChange: any;
}) {
  return (
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
}: {
  options: OptionChoiceType[];
  curOptions: Map<string, boolean>;
  onChange: any;
}) {
  return (
    <OptionWrap>
      {options?.length > 0 &&
        options.map((opt) => {
          return (
            <OptionItem
              option={opt}
              curOptions={curOptions}
              onChange={onChange}
            />
          );
        })}
    </OptionWrap>
  );
}
