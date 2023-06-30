import { useEffect } from "react";
import styled from "styled-components";

const Item = styled.li`
	margin-bottom: 20px;
	margin-right: 60px;
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
	cursor: ${props => props.isSelect ? "pointer" : "default"};
	background: ${props => props.choice ? "#007fa8" : "#FFF"};
	color: ${props => props.choice ? "#FFF" : 
		(props=> props.isSelect ? "#000": "#c0c4cc")};
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
	const listItems = props.tools?.map((tool, i) => {
		if (props.toolId === 0 && i === 0 && tool.isSelect === true)
			props.onChange(tool.id);
		if (props.toolId === tool.id && tool.isSelect === false) {
			for (let i = 0; i < props.tool?.length; i++) {
				if (props.tool[i].isSelect === true) {
					props.onChange(Number(props.tool[i].id));
					break;
				}
			}
		}
		return (
		<ToolLabel>
			{tool.isSelect === true ?
			((props.toolId === tool.id) ? 
			<RadioInput type="radio" value={tool.id} 
				onClick={(e) => {
					props.onChange(Number(e.target.value));
				}}
				aria-checked="true"
			/> : <RadioInput type="radio" value={tool.id} 
			onClick={(e) => {
				props.onChange(Number(e.target.value));
			}}
			/>) : <RadioInput type="radio" value={tool.id} disabled="disabled"/>
			}
			<RadioInner isSelect={tool.isSelect} choice={Number(tool.id) === Number(props.toolId)}>{tool.name}</RadioInner>
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