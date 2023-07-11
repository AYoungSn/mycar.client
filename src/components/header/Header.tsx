import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { carsApi } from '../../utils/Api';
import CarMenuBox from '../CarMenuBox';
import { Head, HeaderWrap } from '../styled/Head';
import Logo from '../styled/Logo';
import { CarItem } from '../../type/ApiResponseType';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../utils/recoil/modal';

const MenuBtn = styled.button`
  position: relative;
  cursor: pointer;
  background: transparent;
  color: #000000;
  font-family: 'HyundaiSansHeadKRR';
  font-size: 16px;
  margin: 32px 0 0 20px;
  border: 0;
  vertical-align: top;
`;
const Triangle = styled.div<{ isOpen: boolean }>`
  border-top: ${(props) => (!props.isOpen ? '7px solid #000' : 0)}; // 위
  border-bottom: ${(props) => (props.isOpen ? '7px solid #000' : 0)}; // 아래
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  margin-left: 18px;
  display: inline-block;
  vertical-align: middle;
`;
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
      for (let i = 0; i < data.length; i++) {
        if (data[i].carCode === carCode) {
          setCarName(data[i].carName);
        }
      }
    }
    fetchData();
  }, [data.length, carCode, data]);
	// useEffect(() => {
	// 	if ()
	// })
  return (
    <>
      <MenuBtn
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span>{carName}</span>
        <Triangle isOpen={isOpen}></Triangle>
      </MenuBtn>
      {isOpen && (
        <Section>
          {data.map((item: CarItem, id: number) => {
            return <CarMenuBox key={item.carCode} data={item} />;
          })}
        </Section>
      )}
			{ location.pathname === '/cars/estimation/models/making' && 
				<SummaryBtn onClick={() => setModal({modalName: 'SUMMARY'})}>
					<span>요약 보기</span>
				</SummaryBtn>
			}
    </>
  );
}

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
