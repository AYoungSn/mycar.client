import styled from "styled-components";

const Item = styled.li`
	margin-bottom: 20px;
	margin-right: 60px;
	list-style: none;
	display: inline-block;
`
const ToolLabel = styled.label`
	width: auto;
	min-width: 109px;
	height: 40px;
	position: relative;
    display: inline-block;
    outline: none;
	color: #000;
	font-size: 14px;
`
const RadioInput = styled.input`
	opacity: 0;
	outline: none;
	position: absolute;
	z-index: -1;
    outline: none;
	border-radius: 0;
	line-height: 100%;
	height: 40px;
`
const RadioGroup = styled.div`
	line-height: 1;
	vertical-align: middle;
	margin-top: 10px;
	width: 100%;
	display: inline-block;
`
const RadioInner = styled.span`
	width: 100%;
	cursor: pointer;
	background: #007fa8;
	padding: 12px 10px!important;
	border-left: 1px solid #dcdfe6;
	white-space: nowrap;
    vertical-align: middle;
	border: 1px solid #dcdfe6;
    font-weight: 500;
	position: relative;
    display: inline-block;
    outline: none;
	text-align: center;
`
function Tool(props) {
	const listItems = props.tool?.map((tool) => {
		return (
		<ToolLabel>
			<RadioInput type="radio" value={tool.id}/>
			<RadioInner>{tool.name}</RadioInner>
		</ToolLabel>
		)
	})
	return (
		<Item>
			<div><b>{props.name}</b></div>
			<RadioGroup>
				{listItems}
			</RadioGroup>
		</Item>
	)
}

export default Tool;