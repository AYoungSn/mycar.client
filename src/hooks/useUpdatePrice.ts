import { useRecoilValue } from 'recoil';
import { priceState } from '../utils/recoil/carInfo';
import {
	exteriorState,
	hgaOptListState,
	hgaOptState,
	npfOptListState,
	npfOptState,
	detailOptListState,
	detailOptState,
} from '../utils/recoil/options';
import { useEffect, useState } from 'react';

export default function useUpdatePrice() {
	const price = useRecoilValue(priceState);
	const [totalPrice, setTotalPrice] = useState(price);
	const exterior = useRecoilValue(exteriorState);
	const detailOpt = useRecoilValue(detailOptState);
	const detailListOpt = useRecoilValue(detailOptListState);
	const hgaOpt = useRecoilValue(hgaOptState);
	const hgaListOpt = useRecoilValue(hgaOptListState);
	const npfOpt = useRecoilValue(npfOptState);
	const npfListOpt = useRecoilValue(npfOptListState);
	useEffect(() => {
		const detailPrice = [...detailOpt]
			.filter(([key, value]) => detailOpt.get(key) === true)
			.map(([key, value]) => detailListOpt.get(key)?.price)
			.reduce((acc, cur) => {
				return (acc || 0) + (cur || 0);
			}, 0);
		const hgaPrice = [...hgaOpt]
			.filter(([key, value]) => hgaOpt.get(key) === true)
			.map(([key, value]) => hgaListOpt.get(key)?.price)
			.reduce((acc, cur) => {
				return (acc || 0) + (cur || 0);
			}, 0);
		const npfPrice = [...npfOpt]
			.filter(([key, value]) => npfOpt.get(key) === true)
			.map(([key, value]) => npfListOpt.get(key)?.price)
			.reduce((acc, cur) => {
				return (acc || 0) + (cur || 0);
			}, 0);
		setTotalPrice(price + exterior.price + (detailPrice || 0) + (hgaPrice || 0) + (npfPrice || 0));
	}, [
		price,
		exterior,
		detailListOpt,
		detailOpt,
		hgaListOpt,
		hgaOpt,
		npfListOpt,
		npfOpt,
	]);
	return totalPrice;
}
