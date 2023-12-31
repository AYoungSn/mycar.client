import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FlexDiv, FlexItem } from '../../../components/styled/Flex';
import Header from '../../../components/header/Header';
import ModelPreview from '../../../components/ModelPreview';
import useFetchModelInit from '../../../hooks/useFetchModelInit';
import { detailOptListState } from '../../../utils/recoil/options';
import { Model } from '../../../type/ApiResponseType';
import { modelState } from '../../../utils/recoil/carInfo';
import Options from '../../../components/options/Options';
import { FlexDivItemType } from '../../../type/styledType';
import { OptionHead } from '../../../components/styled/Option';
import Exterior from '../../../components/options/color/Exterior';
import Interior from '../../../components/options/color/Interior';
import { ConfirmBtn } from '../../../components/styled/Modal';
import useFetchModelInfo from '../../../hooks/useFetchModelInfo';

export default function MakeCar() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [model, setModel] = useRecoilState<Model>(modelState);
	const detailList = useRecoilValue(detailOptListState);
	useFetchModelInit(Number(searchParams.get('modelId')), setModel);
	useFetchModelInfo(Number(searchParams.get('modelId')));
	return (
		<div>
			<Header carCode={searchParams.get('carCode') || ''}></Header>
			<ContentWrap>
				{model && <ModelPreview model={model} />}
				{detailList &&
					<OptionAreaWrap $marginTop="10px" $textAlign="none">
						<div>
							<OptionHead>색상</OptionHead>
							<Exterior />
							<Interior />
						</div>
						<Options />
						<div style={{ textAlign: "center" }}>
							<ConfirmBtn onClick={() => {
								navigate(`/cars/estimation/models/estimate`);
							}}>
								내 차 만들기 완료
							</ConfirmBtn>
						</div>
					</OptionAreaWrap>
				}
			</ContentWrap>
		</div>
	);
}

const ContentWrap = styled(FlexDiv)`
  position: relative;
  height: 100%;
  width: auto;
	min-width: 1000px;
  margin: 0 auto;
  overflow-x: hidden;
  justify-content: space-between;
`;

const OptionAreaWrap = styled(FlexItem) <FlexDivItemType>`
  width: 660px;
  padding: 100px 72px 120px 80px;
`;