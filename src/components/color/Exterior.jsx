import styled from "styled-components";
import { ColorBtn, OptionColor, OptionName, OptionTitle } from "../styled/Option";
import { FlexUl } from "../styled/Flex";
import { exteriorState } from "../../utils/recoil/color";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

const ExteriorItem = styled.li`
	margin: 8px;
`;

export function Exterior(props) {
	const [curExterior, setCurExterior] = useState('');
	const [exteriorId, setExteriorId] = useRecoilState(exteriorState);
	useEffect(() => {
		async function initExterior() {
			if (exteriorId === undefined || exteriorId === 0) {
				setExteriorId(props.data[0]?.id);
				setCurExterior(props.data[0]?.name);
			}
		}
		initExterior();
	}, [props.data.length]);
	return (
		<section>
			<OptionTitle>
				<OptionName>외장색상</OptionName>
				<OptionColor>{curExterior}</OptionColor>
			</OptionTitle>
			<FlexUl>
				{
					props.data?.map((ext, id) => {
						return (
							<ExteriorItem key={ext.id}>
								<ColorBtn width={"85px"} height={"85px"} style={{backgroundImage:`url(${ext.imgUri})`}}
									active={ext.id === exteriorId}
									onClick={() => {
										console.log("ext", ext);
										setExteriorId(ext.id);
										setCurExterior(ext.name);
									}}/>
							</ExteriorItem>
						)
					})
				}
			</FlexUl>
		</section>
	)
}