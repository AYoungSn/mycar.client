import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { carsApi } from '../../utils/Api';
import CarMenuBox from '../CarMenuBox';
import { Head, HeaderWrap, MenuBtn, Triangle } from '../styled/Head';
import Logo from '../styled/Logo';
import { CarItem } from '../../type/ApiResponseType';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../utils/recoil/modal';
import { ModalBackground } from '../styled/Modal';

function Header({ carCode }: { carCode: string }) {
	return (
		<HeaderWrap>
			<Head>
				<div>
					<Link to="/">
						<Logo type="button" name="hyundai" />
					</Link>
					<Menu carCode={carCode} />
				</div>
			</Head>
		</HeaderWrap>
	);
}

export default Header;

const Section = styled.section`
  background: #fff;
  position: absolute;
  z-index: 99;
  width: 100%;
  padding: 20px;
  top: 81px;
  display: flex;
  justify-content: flex-start;
  grid-gap: 30px;
`;

const SummaryBtn = styled.button`
	background: transparent;
	padding: 0 15px;
	width: 100px;
	height: 33px;
	border: 1px solid black;
	cursor: pointer;
	position: absolute;
	right: 40px;
	top: 40px;
`;

function Menu({ carCode }: { carCode: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [carName, setCarName] = useState('');
	const [data, setData] = useState<CarItem[]>([]);
	const location = useLocation();
	const setModal = useSetRecoilState(modalState);
	useEffect(() => {
		async function fetchData() {
			setData((await carsApi.carList).data);
			data.forEach((item) => {
				if (item.carCode === carCode) {
					setCarName(item.carName);
				}
			})
		}
		fetchData();
	}, [data.length, carCode, data]);
	const closeMenuHandler = (e: React.MouseEvent) => {
		if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutSide') {
			setIsOpen(false);
		}
	}
	return (
		<>
			<MenuBtn
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<span>{carName}</span>
				<Triangle $isOpen={isOpen}></Triangle>
			</MenuBtn>
			{isOpen && (
				<div>
					<ModalBackground
						style={{ top: "100px" }}
						id='modalOutSide'
						onClick={closeMenuHandler} />
					<Section>
						{data.map((item: CarItem, id: number) => {
							return <CarMenuBox key={item.carCode} data={item} />;
						})}
					</Section>
				</div>
			)}
			{location.pathname === '/cars/estimation/models/making' &&
				<SummaryBtn onClick={() => setModal({ modalName: 'SUMMARY' })}>
					<span>요약 보기</span>
				</SummaryBtn>
			}
		</>
	);
}