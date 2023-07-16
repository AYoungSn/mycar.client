import styled from 'styled-components';
import { TooltipType } from '../../type/optionType';

function Tool({ tools, toolId, onChange, name }: Props) {
	const listItems = tools?.map((tool, i) => {
		if (toolId === 0 && i === 0 && tool.isSelect === true) onChange(tool.id);
		if (toolId === tool.id && tool.isSelect === false) {
			for (let i = 0; i < tools?.length; i++) {
				if (tools[i].isSelect === true) {
					onChange(Number(tools[i].id));
					break;
				}
			}
		}
		return (
			<ToolLabel key={tool.id}>
				{tool.isSelect === true ? (
					<RadioInput
						type="radio"
						value={tool.id}
						onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
							onChange(Number(e.target.value));
						}}
						aria-checked={toolId === tool.id} />
				) : (
					<RadioInput
						type="radio"
						value={tool.id}
						onClick={() => { }}
						disabled="disabled"
					/>
				)}
				<RadioInner
					$isSelect={tool.isSelect}
					$choice={Number(tool.id) === Number(toolId)}
				>
					{tool.name}
				</RadioInner>
			</ToolLabel>
		);
	});
	return (
		<Item key={toolId}>
			<div>
				<b>{name}</b>
			</div>
			<RadioGroup>{listItems}</RadioGroup>
		</Item>
	);
}

export default Tool;

const Item = styled.li`
  margin-bottom: 20px;
  margin-right: 60px;
  display: inline-block;
`;
const ToolLabel = styled.label`
  width: auto;
  min-width: 109px;
  height: 40px;
  position: relative;
  display: inline-block;
  outline: none;
  color: #000;
  font-size: 14px;
`;
const RadioInput = styled.input<{
	type: string;
	value: number;
	onClick: any;
	disabled?: string;
}>`
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
  outline: none;
  border-radius: 0;
  line-height: 100%;
  height: 40px;
`;
const RadioGroup = styled.div`
  line-height: 1;
  vertical-align: middle;
  margin-top: 10px;
  width: 100%;
  display: inline-block;
`;
const RadioInner = styled.span<{ $isSelect: boolean; $choice: boolean }>`
  width: 100%;
  cursor: ${(props) => (props.$isSelect ? 'pointer' : 'default')};
  background: ${(props) => (props.$choice ? '#007fa8' : '#FFF')};
  color: ${(props) =>
		props.$choice ? '#FFF' : props.$isSelect ? '#000' : '#c0c4cc'};
  padding: 12px 10px !important;
  border-left: 1px solid #dcdfe6;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid #dcdfe6;
  font-weight: 500;
  position: relative;
  display: inline-block;
  outline: none;
  text-align: center;
`;
type Props = {
	tools: TooltipType[];
	toolId: number;
	onChange: any;
	name: string;
};