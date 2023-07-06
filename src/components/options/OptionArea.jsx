import styled from "styled-components"
import { Color } from "./color/Color"
import { Options } from "./Options"
import { FlexItem } from "../styled/Flex"

const OptionAreaWrap = styled(FlexItem)`
	width:660px;
	padding: 100px 72px 120px 80px;
`
export function OptionArea() {
	return (
		<OptionAreaWrap>
			<Color />
			<Options />
		</OptionAreaWrap>
	)
}