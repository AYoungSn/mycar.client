import styled from "styled-components"
import { Color } from "./color/Color"
import { Options } from "./Options"
import { FlexItem } from "../styled/Flex"
import { FlexDivItemType } from "../../type/styledType"

const OptionAreaWrap = styled(FlexItem)<FlexDivItemType>`
	width:660px;
	padding: 100px 72px 120px 80px;
`
export function OptionArea() {
	return (
		<OptionAreaWrap marginTop="10px" textAlign="none">
			<Color />
			<Options />
		</OptionAreaWrap>
	)
}