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
  interiorListState,
  interiorState,
  detailOptState,
} from '../../../utils/recoil/options';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExteriorType, InteriorType } from '../../../type/optionType';
import { optionsApi } from '../../../utils/Api';
import MakeOptionCodeList from '../../../utils/makeOptionCodeList';
import { modalState } from '../../../utils/recoil/modal';
import { useExteriorListState, useUpdateInteriorList } from '../../../hooks/useColorUpdate';

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
                onClick={() => {
									setExterior(ext);
                }}
              />
            </ExteriorItem>
          ) : (
            <ExteriorItem key={ext.code}>
              <ColorBtn
                width={'85px'}
                height={'85px'}
                style={{ backgroundImage: `url(${ext.imgUri})` }}
                active={ext.id === exterior.id ? true : false}
                onClick={() => {
                  async function changeColor() {
                    const optionCodes = MakeOptionCodeList(detailOpts);
                    const data = (
                      await optionsApi.changeColor({
                        beforeExteriorCode: exterior.code,
                        beforeInteriorCode: interior.code,
                        interiorCode: interior.code,
                        exteriorCode: ext.code,
                        modelId: modelId,
                        carCode: carCode,
                        optionCode: optionCodes,
                      })
                    ).data;
                    if (data.interiorChangeColorYn === true) {
                      setModal({
                        modalName: 'CHANGE-INTERIOR',
                        colorName: ext.name,
                      });
                    } else {
                      setModal({
                        modalName: 'CHANGE-TRIM',
                        colorName: ext.name,
                        trimChangeData: data,
                      });
                    }
                  }
                  changeColor();
                  // 선택한 외장색상 기반으로 내장 색상 목록 재요청
                  // -> 기존 내장 색상이 선택 불가한 경우 선택가능한 색상으로 변경
                }}
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