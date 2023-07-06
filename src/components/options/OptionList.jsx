import styled from "styled-components"
import { FlexLi, FlexUl } from "../styled/Flex";

const OptionWrap = styled(FlexUl)`
	flex: flex-wrap;
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 30px;
`;
const Item = styled(FlexLi)`
	position: relative;
	width: 237px;
	height: 130px;
	flex-direction: column;
	border: ${props => props.active ? "1px solid #007fa8" : "1px solid #ccc"};
	color: #000;
	margin-right: 10px;
	margin-bottom: 30px;
	overflow: hidden;
	background: ${props => props.choiceYN === true ? "#FFF" : "#AAA"}
`;
const OptionBtn = styled.button`
	height: 100%;
	cursor: pointer;
	background-color: transparent;
	border: 0;
	padding: 10px;
`;

function OptionItem({ id, option, curOptions, onChange }) {
	return <Item active={curOptions?.get(option.code) === true} 
				choiceYN={option.choiceYN} key={id}>
		<OptionBtn onClick={() => {
				onChange(option.code)
			}}>
			<label>
				<div>
					<p>{option.name}</p>
				</div>
				<div><p>{option.price}</p></div>
			</label>
		</OptionBtn>
	</Item>
}

export function OptionList({options, curOptions, onChange}) {
	return <OptionWrap>
		{
			options?.length > 0 &&
			options.map((opt, id) => {
				return <OptionItem key={id}
					option={opt} curOptions={curOptions}
					onChange={onChange} />
			})
		}
	</OptionWrap>
}