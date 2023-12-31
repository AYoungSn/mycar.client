import styled from 'styled-components';
import { FlexLi, FlexUl } from '../styled/Flex';
import { FlexLiType } from '../../type/styledType';
import { OptionChoiceType } from '../../type/optionType';
import PricePrint from '../../utils/PricePrint';

export default function OptionList({
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
							key={key}
							option={value}
							curOptions={curOptions}
							onChange={value.choiceYn === true ? onChange : disableOnChange}
						/>
					);
				})
			}
		</OptionWrap>
	);
}

function OptionItem({
	option,
	curOptions,
	onChange,
}: {
	option: OptionChoiceType | null;
	curOptions: Map<string, boolean>;
	onChange: any;
}) {
	return (option &&
		<Item
			key={option.name}
			$active={String(curOptions?.get(option.code) === true)}
			$choiceyn={String(option.choiceYn)}
		>
			<OptionBtn
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					onChange(e, option.code);
				}}
			>
				<label>
					<div style={{ fontSize: "16px", margin: "10px" }}>
						<p>{option.name}</p>
					</div>
					<div style={{ fontSize: "14px", color: "#666" }}>
						<p>{PricePrint(option.price)}</p>
					</div>
				</label>
			</OptionBtn>
		</Item>
	);
}

const OptionWrap = styled(FlexUl)`
  flex: flex-wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 30px;
`;
const Item = styled(FlexLi) <FlexLiType>`
  position: relative;
  width: 237px;
  height: 130px;
  flex-direction: column;
  border: ${(props) => (props.$active === 'true' ? '1px solid #007fa8' : '1px solid #ccc')};
  color: #000;
  margin-right: 10px;
  margin-bottom: 30px;
  overflow: hidden;
  background: ${(props) => (props.$choiceyn === 'true' ? '#FFF' : '#AAA')};
`;
const OptionBtn = styled.button`
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 10px;
`;