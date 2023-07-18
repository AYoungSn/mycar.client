import styled from 'styled-components';
import { CarItem } from '../type/ApiResponseType';
import PricePrint from '../utils/PricePrint';

function CarMenuBox({ data }: { data: CarItem }) {
	return (
		<a href={`/cars/estimation/models?carCode=${data.carCode}`}>
			<Button>
				<TrimName $ishome={window.location.pathname === '/' ? true : false}>
					{data.carName}
				</TrimName>
				<Price $ishome={window.location.pathname === '/' ? true : false}>
					{PricePrint(data.price)} ~
				</Price>
			</Button>
		</a>
	);
}

export default CarMenuBox;

const TrimName = styled.h4<{ $ishome: boolean }>`
  font-size: ${(props) => (props.$ishome ? '26px' : '16px')};
  text-align: ${(props) => (props.$ishome ? 'left' : 'center')};
`;
const Price = styled.div<{ $ishome: boolean }>`
  font-family: 'HyundaiSansHeadKR';
  font-size: ${(props) => (props.$ishome ? '22px' : '14px')};
  color: #666;
  margin-top: 8px;
  text-align: ${(props) => (props.$ishome ? 'left' : 'center')};
`;
const Button = styled.button`
  background: #f6f3f2;
  border: 3px solid #f6f3f2;
  padding: 30px;
  cursor: pointer;
`;