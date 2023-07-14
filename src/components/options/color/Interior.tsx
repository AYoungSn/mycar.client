import styled from 'styled-components';
import { FlexUl } from '../../styled/Flex';
import {
  ColorBtn,
  DisabledBtn,
  OptionColor,
  OptionName,
  OptionTitle,
} from '../../styled/Option';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  exteriorListState,
  exteriorState,
  interiorListState,
  interiorState,
  detailOptState,
} from '../../../utils/recoil/options';
import { ExteriorType, InteriorType } from '../../../type/optionType';
import { optionsApi } from '../../../utils/Api';
import { useSearchParams } from 'react-router-dom';
import MakeOptionCodeList from '../../../utils/makeOptionCodeList';
import { TrimChangeModalDataType } from '../../../type/ApiResponseType';
import { modalState } from '../../../utils/recoil/modal';
import { useInitInterior, useUpdateInterior } from '../../../hooks/useInteriorUpdate';

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
            return item.choiceYN === true ? (
              <InteriorItem key={item.code}>
                <ColorBtn
                  width="496px"
                  height="75px"
                  style={{ backgroundImage: `url(${item.imgUri})` }}
                  active={item.id === interior.id}
                  onClick={() => {
                    // 현재 선택된 내장색상 기반으로 선택 가능한 외장색상 목록 update
                    async function fetchExteriorList() {
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
                            a.choiceYN === true
                              ? 1
                              : (b.choiceYN === true
                              ? (a.id > b.id
                                ? 1
                                : -1)
															: -1),
                        ),
                      );
                      setInterior(item);
                    }
                    fetchExteriorList();
                  }}
                />
              </InteriorItem>
            ) : (
              <InteriorItem key={item.code}>
                <ColorBtn
                  width='496px'
                  height='75px'
                  style={{ backgroundImage: `url(${item.imgUri})` }}
                  active={item.id === interior.id}
                  onClick={() => {
                    async function changeColor() {
                      const optionCodes = MakeOptionCodeList(detailOpts);
                      const data: TrimChangeModalDataType = (
                        await optionsApi.changeColor({
                          beforeExteriorCode: exterior.code,
                          beforeInteriorCode: interior.code,
                          interiorCode: item.code,
                          exteriorCode: exterior.code,
                          modelId: modelId,
                          carCode: carCode,
                          optionCode: optionCodes,
                        })
                      ).data;
                      if (data.exteriorChangeColorYn === true) {
                        setModal({
                          modalName: 'CHANGE-EXTERIOR',
                          colorName: item.name,
                        });
                      } else {
                        setModal({
                          modalName: 'CHANGE-TRIM',
                          colorName: item.name,
                          trimChangeData: data,
                        });
                      }
                    }
                    changeColor();
                  }}
                />
                <DisabledBtn />
              </InteriorItem>
            );
          })}
      </FlexUl>
    </section>
  );
}
const InteriorItem = styled.li`
  margin-bottom: 25px;
  position: relative;
`;