import styled from "styled-components"
import { FlexItem } from "./styled/FlexItem"
import { Color } from "./color/Color"

const OptionAreaWrap = styled(FlexItem)`
	width:660px;
	padding: 100px 72px 120px 80px;
`
export function OptionArea(props) {
	return (
		<OptionAreaWrap>
			<Color exterior={props.exterior} interior={props.interior}/>
		</OptionAreaWrap>
	)
}