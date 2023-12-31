import { useRecoilValue, useSetRecoilState } from "recoil";
import { ReactNode } from "react";
import { styled } from "styled-components";
import SimpleHeader from "../../../../components/header/SimpleHeader";
import { modelState, priceState } from "../../../../utils/recoil/carInfo";
import { FlexDiv, FlexLi } from "../../../../components/styled/Flex";
import { detailOptListState, detailOptState, exteriorState, hgaOptListState, hgaOptState, interiorState, npfOptListState, npfOptState } from "../../../../utils/recoil/options";
import { OptionChoiceType } from "../../../../type/optionType";
import useUpdatePrice from "../../../../hooks/useUpdatePrice";
import PricePrint from "../../../../utils/PricePrint";
import { modalState } from "../../../../utils/recoil/modal";
import { useNavigate } from "react-router-dom";

function Estimate() {
	const navigate = useNavigate();
	const model = useRecoilValue(modelState);
	const price = useRecoilValue(priceState);
	const totalPrice = useUpdatePrice();
	const exterior = useRecoilValue(exteriorState);
	const interior = useRecoilValue(interiorState);
	const detailList = useRecoilValue(detailOptListState);
	const detailOpts = useRecoilValue(detailOptState);
	const hgaList = useRecoilValue(hgaOptListState);
	const hgaOpts = useRecoilValue(hgaOptState);
	const npfList = useRecoilValue(npfOptListState);
	const npfOpts = useRecoilValue(npfOptState);
	const setModal = useSetRecoilState(modalState);
	const prevPage = () => {
		navigate(`/cars/estimation/models/making?modelId=${model.modelId}&carCode=${model.carCode}&trimCode=${model.trimCode}`)
	}
	return <>
		<SimpleHeader />
		<Section>
			<div>
				<strong>나의 {model.carName} (이)가 완성되었습니다!</strong>
				<p>{model.modelName}</p>
			</div>
		</Section>
		<Section>
			<div>
				<div style={{ borderBottom: "2px solid #7f7f7f", padding: "10px" }}>
					<h2>차량 선택 사항</h2>
				</div>
				<div style={{ position: "relative" }}>
					<ul>
						<TableInner name="모델" price={price} onChange={() => setModal({ modalName: 'CHANGE-MODEL' })}>
							<div>
								<h3>{model.modelName}</h3>
								<p>* 모델을 변경하시면 색상과 옵션이 초기화 됩니다.</p>
							</div>
						</TableInner>
						<TableInner name="색상" price={exterior.price} onChange={prevPage}>
							<FlexDiv>
								<ColorItem title="외장색상" name={exterior.name} />
								<ColorItem title="내장색상" name={interior.name} />
							</FlexDiv>
						</TableInner>
						<TableInner
							name="옵션"
							price={totalPrice - model.price - exterior.price}
							onChange={prevPage}
						>
							<OptionWrap>
								<ul>
									{
										[...detailOpts]
											.filter(([key, value]) => value === true).length > 0 &&
										<ChoiceOptionList name="옵션" optList={detailList} selectOpts={detailOpts} />
									}
									{
										[...hgaOpts].filter(([key, value]) => value === true).length > 0 &&
										<ChoiceOptionList name="H Genuine Accessories" optList={hgaList} selectOpts={hgaOpts} />
									}
									{
										[...npfOpts].filter(([key, value]) => value === true).length > 0 &&
										<ChoiceOptionList name="N" optList={npfList} selectOpts={npfOpts} />
									}
								</ul>
							</OptionWrap>
						</TableInner>
					</ul>
					<p style={{ textAlign: "right", fontSize: "20px", margin: "20px 0" }}>
						<span style={{ fontSize: "16px", paddingRight: "30px" }}>총 차량 가격</span>
						{PricePrint(totalPrice)}
					</p>
				</div>
			</div>
		</Section>
	</>
}
export default Estimate;

function ChoiceOptionList({ name, optList, selectOpts }: { name: string, optList: Map<string, OptionChoiceType>, selectOpts: Map<string, boolean> }) {
	return (<li key={name} style={{ borderBottom: "1px solid #e5e5e5", marginBottom: "10px", display: "flex" }}>
		<div style={{ display: "inline-block", width: "82px", marginRight: "10px" }}>
			{name}
		</div>
		<ul style={{ width: "100%" }}>
			{
				[...selectOpts]
					.filter(([key, value]) => value === true)
					.map(([key, value]) => {
						return <FlexLi key={key} style={{ justifyContent: "space-between", }}>
							<p style={{ color: "#666" }}>{optList.get(key)?.name}</p>
							<div style={{ margin: "10px" }}></div>
							<Price price={optList.get(key)?.price || 0} textAlign="right" />
						</FlexLi>
					})
			}
		</ul>
	</li>)
}

function ColorItem({ title, name }: { title: string, name: string }) {
	return (<div style={{ display: "inline-block" }}>
		<strong style={{ margin: "10px" }}>{title}</strong>
		<span>{name}</span>
	</div>
	)
}
function TableInner({ name, price, onChange, children }: { name: string, price: number, onChange: any, children: ReactNode }) {
	return (<LiItem key={name}>
		<OptionName>
			<h3>{name}</h3>
			<Price price={price} textAlign="left" />
			<ChangeBtn onClick={onChange} >
				<span>변경하기</span>
			</ChangeBtn>
		</OptionName>
		{children}
	</LiItem>)
}

function Price({ price, textAlign }: { price: number, textAlign: string }) {
	return (<strong style={{ display: "block", marginBottom: "15px", textAlign: textAlign === 'left' ? 'left' : 'right', fontSize: "16px" }}>
		{price > 0 ? PricePrint(price) : '추가금액 없음'}
	</strong>)
}
const ChangeBtn = styled.button`
	width: 70px;
	font-size: 12px;
	background-color: #767676;
	height: 30px;
	color: white;
`;

const Section = styled.section`
	padding: 80px 30px 0;
	margin-bottom: 50px;
	& > div > strong {
		display: block;
    margin: 0;
    padding-bottom: 20px;
    margin-top: 0!important;
    font-size: 30px;
    line-height: 44px;
		text-align: center;
	}
	& > div > p {
		text-align: center;
	}
`;
const LiItem = styled(FlexLi)`
	padding: 30px 0;
	justify-content: flex-start;
	border-bottom: 1px solid #e5e5e5;
	flex-wrap: ;
	& > div > h3 {
		margin-bottom: 15px;
	}
`;
const OptionName = styled.div`
	max-width: 256px;
	width: 25%;
`;
const OptionWrap = styled.div`
	width: 75%;
	& > ul {
		width: 100%;
	}
	& > ul > li:last-child {
		border-bottom: none !important;
	}
`;