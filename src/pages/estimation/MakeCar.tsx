import styled from 'styled-components';
import { FlexDiv, FlexItem } from '../../components/styled/Flex';
import Header from '../../components/header/Header';
import { useSearchParams } from 'react-router-dom';
import { ModelPreview } from '../../components/ModelPreview';
import useFetchModelInit from '../../hooks/useFetchModelInit';
import { useRecoilState, useRecoilValue } from 'recoil';
import { detailOptListState } from '../../utils/recoil/options';
import { Model } from '../../type/ApiResponseType';
import { modelState } from '../../utils/recoil/carInfo';
import { Color } from '../../components/options/color/Color';
import { Options } from '../../components/options/Options';
import { FlexDivItemType } from '../../type/styledType';

const ContentWrap = styled(FlexDiv)`
  position: relative;
  height: 100%;
  width: auto;
  margin: 0 auto;
  overflow-x: hidden;
  justify-content: space-between;
`;

const OptionAreaWrap = styled(FlexItem)<FlexDivItemType>`
  width: 660px;
  padding: 100px 72px 120px 80px;
`;

export default function MakeCar() {
  const [searchParams] = useSearchParams();
  const [model, setModel] = useRecoilState<Model>(modelState);
  const detailList = useRecoilValue(detailOptListState);
  useFetchModelInit(Number(searchParams.get('modelId')), setModel);
  return (
    <div>
      <Header carCode={searchParams.get('carCode') || ''}></Header>
      <ContentWrap>
        {model && <ModelPreview model={model} />}
        {detailList && 
					<OptionAreaWrap marginTop="10px" textAlign="none">
						<Color />
						<Options />
					</OptionAreaWrap>
				}
      </ContentWrap>
    </div>
  );
}
