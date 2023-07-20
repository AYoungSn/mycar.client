import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import {
	ColorBtn,
	DisabledBtn,
	OptionColor,
	OptionName,
	OptionTitle,
} from '../../styled/Option';
import { FlexUl } from '../../styled/Flex';
import {
	exteriorListState,
	exteriorState,
	interiorState,
	detailOptState,
} from '../../../utils/recoil/options';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ExteriorType } from '../../../type/optionType';
import { modalState } from '../../../utils/recoil/modal';
import { useUpdateInteriorList } from '../../../hooks/color/useColorListUpdate';
import { disableColor } from '../../../utils/OnClickFunc';
import { ExteriorSort } from '../../../utils/colorSort';
import { useExteriorState } from '../../../hooks/color/useColorUpdate';

export default function Exterior() {
	const [searchParams] = useSearchParams();
	const [exterior, setExterior] = useRecoilState(exteriorState);
	const interior = useRecoilValue(interiorState);
	const exteriorList = useRecoilValue<ExteriorType[]>(exteriorListState);
	const detailOpts = useRecoilValue(detailOptState);
	const carCode = searchParams.get('carCode') || 'undefined';
	const trimCode = searchParams.get('trimCode') || 'undefined';
	const modelId = Number(searchParams.get('modelId') || '0');
	// modal
	const setModal = useSetRecoilState(modalState);
	useExteriorState();
	useUpdateInteriorList(carCode, trimCode);
	return (
		<section>
			<OptionTitle>
				<OptionName $marginTop="0" $textAlign="left">
					외장색상
				</OptionName>
				<OptionColor $marginTop="0" $textAlign="right">
					{exterior.name}
				</OptionColor>
			</OptionTitle>
			<FlexUl>
				{ExteriorSort([...exteriorList]).map((ext: ExteriorType, id: number) => {
					return ext.choiceYn === true ? (
						<ExteriorItem key={ext.code}>
							<ColorBtn
								width={'85px'}
								height={'85px'}
								style={{ backgroundImage: `url(${ext.imgUri})` }}
								$active={String(ext.id === exterior.id ? true : false)}
								onClick={() => setExterior(ext)}
							/>
						</ExteriorItem>
					) : (
						<ExteriorItem key={ext.code}>
							<ColorBtn
								width={'85px'}
								height={'85px'}
								style={{ backgroundImage: `url(${ext.imgUri})` }}
								$active={String(ext.id === exterior.id ? true : false)}
								onClick={() => disableColor(
									detailOpts,
									exterior, interior,
									modelId, carCode,
									interior, ext,
									setModal)}
							/>
							<DisabledBtn />
						</ExteriorItem>
					);
				})}
			</FlexUl>
		</section>
	);
}

const ExteriorItem = styled.li`
  margin: 8px;
  position: relative;
`;