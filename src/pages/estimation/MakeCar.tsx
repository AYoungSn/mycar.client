import styled from 'styled-components';
import { FlexDiv } from '../../components/styled/Flex';
import Header from '../../components/header/Header';
import { useSearchParams } from 'react-router-dom';
import { ModelPreview } from '../../components/ModelPreview';
import useFetchModelInit from '../../hooks/useFetchModelInit';
import { OptionArea } from '../../components/options/OptionArea';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { detailOptListState } from '../../utils/recoil/options';
import { Model } from '../../type/ApiResponseType';
import { modelState } from '../../utils/recoil/carInfo';

const ContentWrap = styled(FlexDiv)`
  position: relative;
  height: 100%;
  width: auto;
  margin: 0 auto;
  overflow-x: hidden;
  justify-content: space-between;
`;

export function MakeCar() {
  const [searchParams] = useSearchParams();
  const [model, setModel] = useRecoilState<Model>(modelState);
  const selectList = useRecoilValue(detailOptListState);
  useFetchModelInit(Number(searchParams.get('modelId')), setModel);
  // if (model) {
  // 	searchParams.set('carCode', model.carCode);
  // 	searchParams.set('trimCode', model.trimCode);
  // }
  return (
    <div>
      <Header carCode={searchParams.get('carCode') || ''}></Header>
      <ContentWrap>
        {model && <ModelPreview model={model}></ModelPreview>}
        {selectList && <OptionArea />}
      </ContentWrap>
    </div>
  );
}
