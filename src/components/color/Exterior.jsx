import styled from "styled-components";
import { OptionColor, OptionName, OptionTitle } from "../styled/Option";
import { FlexUl } from "../styled/Flex";

const ExteriorBtn = styled.button`
	width: 85px;
	height: 85px;
	background-size: cover;
	border: 0;
`;
const ExteriorList = styled(FlexUl)``;
const ExteriorItem = styled.li`
	margin: 8px;
`;

export function Exterior(props) {
	const colorList = props.data?.map((ext, id) => {
		return (
			<ExteriorItem>
				<ExteriorBtn style={{backgroundImage:`url(${ext.imgUri})`}}></ExteriorBtn>
			</ExteriorItem>
		)
	})
	return (
		<section>
			<OptionTitle>
				<OptionName>외장색상</OptionName>
				<OptionColor>{props.curExterior}</OptionColor>
			</OptionTitle>
			<ExteriorList>
				{colorList}
			</ExteriorList>
		</section>
	)
}