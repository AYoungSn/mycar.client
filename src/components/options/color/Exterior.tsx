import styled from 'styled-components';
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
import { useSearchParams } from 'react-router-dom';
import { ExteriorType } from '../../../type/optionType';
import { modalState } from '../../../utils/recoil/modal';
import { useExteriorListState, useUpdateInteriorList } from '../../../hooks/useColorUpdate';
import { disableColor } from '../../../utils/OnClickFunc';

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
	useExteriorListState();
	useUpdateInteriorList(carCode, trimCode);
	
  return (
    <section>
      <OptionTitle>
        <OptionName marginTop="0" textAlign="left">
          외장색상
        </OptionName>
        <OptionColor marginTop="0" textAlign="right">
          {exterior.name}
        </OptionColor>
      </OptionTitle>
      <FlexUl>
        {exteriorList?.map((ext: ExteriorType, id: number) => {
          return ext.choiceYN === true ? (
            <ExteriorItem key={ext.code}>
              <ColorBtn
                width={'85px'}
                height={'85px'}
                style={{ backgroundImage: `url(${ext.imgUri})` }}
                active={ext.id === exterior.id ? true : false}
                onClick={() => setExterior(ext)}
              />
            </ExteriorItem>
          ) : (
            <ExteriorItem key={ext.code}>
              <ColorBtn
                width={'85px'}
                height={'85px'}
                style={{ backgroundImage: `url(${ext.imgUri})` }}
                active={ext.id === exterior.id ? true : false}
                onClick={() => disableColor(detailOpts, exterior, interior, modelId, carCode, interior, ext, setModal)}
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