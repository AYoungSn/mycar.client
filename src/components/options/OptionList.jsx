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
`;
const OptionBtn = styled.button`
	height: 100%;
	cursor: pointer;
	background-color: transparent;
	border: 0;
	padding: 10px;
`;

function OptionItem(props) {
	return <Item active={props.option.active}>
		<OptionBtn>
			<label>
				<div>
					<p>{props.option.name}</p>
				</div>
				<div><p>{props.option.price}</p></div>
			</label>
		</OptionBtn>
	</Item>
}

export function OptionList({options}) {
	return <OptionWrap>
		{
			options?.map((option) => {
				return <OptionItem option={option}></OptionItem>
			})
		}
	</OptionWrap>
}