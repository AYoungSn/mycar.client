import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FlexUl } from '../../styled/Flex';
import {
  ColorBtn,
  DisabledBtn,
  OptionColor,
  OptionName,
  OptionTitle,
} from '../../styled/Option';
import {
  exteriorListState,
  exteriorState,
  interiorListState,
  interiorState,
  detailOptState,
} from '../../../utils/recoil/options';
import { ExteriorType, InteriorType } from '../../../type/optionType';
import { optionsApi } from '../../../utils/Api';
import { modalState } from '../../../utils/recoil/modal';
import { useInitInterior, useUpdateInterior } from '../../../hooks/useInteriorUpdate';
import { disableColor } from '../../../utils/OnClickFunc';

export default function Interior() {
  const [searchParams] = useSearchParams();
  const carCode = searchParams.get('carCode') || 'undefined';
  const trimCode = searchParams.get('trimCode') || 'undefined';
  const modelId = Number(searchParams.get('modelId') || '0');
  const [interior, setInterior] = useRecoilState(interiorState);
  const interiorList = useRecoilValue<InteriorType[]>(interiorListState);
  const setExteriorList = useSetRecoilState(exteriorListState);
  const detailOpts = useRecoilValue(detailOptState);
  const exterior = useRecoilValue(exteriorState);
  // modal 창을 위한 state
  const setModal = useSetRecoilState(modalState);
  useUpdateInterior(modelId);
	useInitInterior(carCode, trimCode);
  return (
    <section>
      <OptionTitle>
        <OptionName marginTop="0" textAlign="left">
          내장색상
        </OptionName>
        <OptionColor marginTop="0" textAlign="right">
          {interior.name}
        </OptionColor>
      </OptionTitle>
      <FlexUl>
        {interiorList.length > 0 &&
          interiorList.map((item, id) => {
            return item.choiceYn === true ? (
              <InteriorItem key={item.code}>
                <ColorBtn
                  width="496px"
                  height="75px"
                  style={{ backgroundImage: `url(${item.imgUri})` }}
                  active={item.id === interior.id}
                  onClick={() => fetchExteriorList(carCode, trimCode, item, setExteriorList, setInterior)}
                />
              </InteriorItem>
            ) : (
              <InteriorItem key={item.code}>
                <ColorBtn
                  width='496px'
                  height='75px'
                  style={{ backgroundImage: `url(${item.imgUri})` }}
                  active={item.id === interior.id}
                  onClick={() => disableColor(detailOpts, exterior, interior, modelId, carCode, item, exterior, setModal)}
                />
                <DisabledBtn />
              </InteriorItem>
            );
          })}
      </FlexUl>
    </section>
  );
}
async function fetchExteriorList(carCode: string, trimCode: string, item: InteriorType, setExteriorList: any, setInterior: any) {
	const data = (
		await optionsApi.enableExteriorList(
			carCode,
			trimCode,
			item.code,
		)
	).data;
	setExteriorList(
		data.exterior.sort(
			(a: ExteriorType, b: ExteriorType) =>
				a.choiceYn === true
					? -1
					: 1
		)
	);
	setInterior(item);
}

const InteriorItem = styled.li`
  margin-bottom: 25px;
  position: relative;
`;