import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import ToolTips from '../../components/ToolTips';
import useFetchToolTips from '../../hooks/tooltips/useFetchToolTips';
import useFetchTrims from '../../hooks/useFetchTrims';
import TrimBox from '../../components/TrimBox';
import { FlexDiv } from '../../components/styled/Flex';
import { Trim } from '../../type/ApiResponseType';
import { useRecoilValue } from 'recoil';
import { drivingIdState, engineIdState, gearboxIdState } from '../../utils/recoil/carInfo';

function TrimModelList() {
	const [searchParams] = useSearchParams();
	const engineId = useRecoilValue(engineIdState);
	const gearboxId = useRecoilValue(gearboxIdState);
	const drivingId = useRecoilValue(drivingIdState);
	useFetchToolTips(
		searchParams.get('carCode'),
		engineId,
		gearboxId,
		drivingId
	);
	const trims = useFetchTrims(
		searchParams.get('carCode'),
		engineId,
		gearboxId,
		drivingId,
	);
	const carCode: string = searchParams.get('carCode') || '';
	return (
		<div>
			<Header carCode={carCode}></Header>
			<ContentWrap>
				<div>
					<ToolTips />
				</div>
				<TrimWrap>
					{trims &&
						trims.map((trim: Trim) => {
							return <TrimBox trim={trim} carCode={carCode} key={trim.modelId} />;
						})}
				</TrimWrap>
			</ContentWrap>
		</div>
	);
}
export default TrimModelList;

const ContentWrap = styled.div`
  padding: 0 50px;
  margin-top: 30px;
`;
const TrimWrap = styled(FlexDiv)`
  margin-top: 30px;
  // background: #222;
  margin: 0 auto;
  width:100%;
  height: 370px;
  position: relative;
  display: flex;
`;