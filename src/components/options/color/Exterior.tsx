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

const ExteriorItem = styled.li`
  margin: 8px;
  position: relative;
`;

export default function Exterior() {
  const [searchParams] = useSearchParams();
  const [exterior, setExterior] = useRecoilState(exteriorState);
  const setInteriorList = useSetRecoilState(interiorListState);
  const interior = useRecoilValue(interiorState);
  const exteriorList = useRecoilValue<ExteriorType[]>(exteriorListState);
  const detailOpts = useRecoilValue(detailOptState);
  const carCode = searchParams.get('carCode') || 'undefined';
  const trimCode = searchParams.get('trimCode') || 'undefined';
  const modelId = Number(searchParams.get('modelId') || '0');
  // modal
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    function initExterior() {
      for (let i = 0; i < exteriorList.length; i++) {
        if (
          exteriorList[i].id === exterior.id &&
          exteriorList[i].choiceYN === false
        ) {
          for (let j = 0; j < exteriorList.length; j++) {
            if (exteriorList[j].choiceYN === true) {
              setExterior({ ...exteriorList[j] });
            }
          }
        }
      }
      if (exteriorList[0] && exterior.choiceYN === false) {
        // 현재 옵션 선택 시 선택 가능한 내장색상 목록 조회
        setExterior({
          ...exteriorList[0],
        });
      }
    }
    initExterior();
  }, [exteriorList]);

	useEffect(() => {
		async function fetchInteriorList() {
			if (exterior.code) {
				const data = (
					await optionsApi.enableInteriorList(
						carCode,
						trimCode,
						exterior.code,
					)
				).data;
				setInteriorList(
					data.interior.sort((a: InteriorType, b: InteriorType) =>
						a.choiceYN === true
							? 1
							: b.choiceYN === true
							? a.id > b.id
								? 1
								: -1
							: -1,
					),
				);
				}
		}
		fetchInteriorList();
	}, [exterior]);
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
