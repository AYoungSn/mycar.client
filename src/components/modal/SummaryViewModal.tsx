import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../../utils/recoil/modal";
import { CloseBtn, ModalBackground, ModalContainer } from "../styled/Modal";
import { styled } from "styled-components";
import { modelState } from "../../utils/recoil/carInfo";
import { exteriorState, interiorState, detailOptState, hgaOptState, npfOptState, detailOptListState, hgaOptListState, npfOptListState } from "../../utils/recoil/options";
import useUpdatePrice from "../../hooks/useUpdatePrice";

const MiniModalContainer = styled(ModalContainer)`
	position: fixed;
	top: 100px;
	left: unset;
	right: 73px;
	margin-top: 0!important;
	padding: 50px 70px;
	-webkit-transform: none;
	transform: none;
	width: 520px;
`;

const PopDropDown = styled.div`
	background-color: #fff;
	text-align: left;
	display: flex;
	flex-direction: column;
	font-size: 16px;
`;
const Grid = styled.div`
	display: grid;
	grid-template-columns: 60px auto;
	border-top: 1px solid #ccc;
	font-family: "HyundaiSansHeadKR";
	font-size: 16px;
	font-weight: 400;
	line-height: 34px;
	letter-spacing: -.4px;
	& > div {
		font-weight: 700;
	}
`;
const Name = styled.div`
	color: #666;
	text-align: left;
	font-size: 14px;
	line-height: 18px;
	font-weight: 400px;
`;
const Price = styled.div<{fontSize: string}>`
	text-align: right;
	font-size: ${props => props.fontSize};
	line-height: 18px;
	font-weight: 400px;
`;

function TableInner({name, price}:{name: string, price: number}) {
	return (<>
		<Name>{name}</Name>
		<Price fontSize="16px">{price <= 0 ? '-' : price} 원</Price>
	</>)
}

export default function SummaryViewModal() {
	const setModal = useSetRecoilState(modalState);
	const model = useRecoilValue(modelState);
	const exterior = useRecoilValue(exteriorState);
	const interior = useRecoilValue(interiorState);
	const detailOpt = useRecoilValue(detailOptState);
	const detailList = useRecoilValue(detailOptListState);
	const hgaOpt = useRecoilValue(hgaOptState);
	const hgaList = useRecoilValue(hgaOptListState);
	const npfOpt = useRecoilValue(npfOptState);
	const npfList = useRecoilValue(npfOptListState);
	const price = useUpdatePrice();
	return <>
		<ModalBackground style={{zIndex: 0}}/>
		<MiniModalContainer width="700px" height="">
			<CloseBtn onClick={() => setModal({ modalName: null })}>X</CloseBtn>
			<PopDropDown>
				<div style={{marginBottom: "30px", textAlign: "left"}}>나의 {model.carName}</div>
				<h3 style={{fontSize: "16px", textAlign: "center"}}>요약 보기</h3>
				<PopDropDown style={{borderTop: "2px solid #7c8191"}}>
					<Grid style={{borderTop: "none", padding: "10px 0"}}>
						<div>모델</div>
						<Grid style={{gridTemplateColumns: "auto 140px", borderTop: "none"}}>
							<TableInner name={model.modelName} price={model.price} />
						</Grid>
					</Grid>
					<Grid style={{padding: "10px 0"}}>
						<div>색상</div>
						<Grid style={{gridTemplateColumns: "auto 140px", borderTop: "none"}}>
							<TableInner name={'외장 - ' + exterior.name} price={exterior.price} />
							<TableInner name={'내장 - ' + interior.name} price={0} />
						</Grid>
					</Grid>
					<Grid style={{padding: "10px 0"}}>
						<div>옵션</div>
						<Grid style={{gridTemplateColumns: "auto 140px", borderTop: "none"}}>
							{
								[...detailOpt].map(([key, value]) => {
									if (value === true) {
										return (<TableInner name={detailList.get(key)?.name || ''} price={detailList.get(key)?.price || 0}/>)
									}
								})
							}
							{
								[...hgaOpt].map(([key, value]) => {
									if (value === true) {
										return (<TableInner name={hgaList.get(key)?.name || ''} price={hgaList.get(key)?.price || 0}/>)
									}
								})
							}
							{
								[...npfOpt].map(([key, value]) => {
									if (value === true) {
										return (<TableInner name={npfList.get(key)?.name || ''} price={npfList.get(key)?.price || 0}/>)
									}
								})
							}
						</Grid>
					</Grid>
					<Grid style={{gridTemplateColumns: "auto auto", borderTop: "2px solid #7c8191"}}>
						<h3>총 차량 가격</h3>
						<Price fontSize="20px" style={{lineHeight: "34px"}}>{price} 원</Price>
					</Grid>
				</PopDropDown>
				<a>
					<button>
						내 차 만들기 완료
					</button>
				</a>
			</PopDropDown>
		</MiniModalContainer>
</>
}