import { useRecoilValue } from "recoil";
import { priceState } from "../utils/recoil/price";
import { exteriorState, hgaOptListState, hgaOptState, interiorState, npfOptListState, npfOptState, selectOptListState, selectOptState } from "../utils/recoil/options";
import { useEffect, useState } from "react";

export default function useUpdatePrice() {
	const price = useRecoilValue(priceState);
	const [totalPrice, setTotalPrice] = useState(price);
	const exterior = useRecoilValue(exteriorState);
	// const interior = useRecoilValue(interiorState);
	const selectOpt = useRecoilValue(selectOptState);
	const selectListOpt = useRecoilValue(selectOptListState);
	const hgaOpt = useRecoilValue(hgaOptState);
	const hgaListOpt = useRecoilValue(hgaOptListState);
	const npfOpt = useRecoilValue(npfOptState);
	const npfListOpt = useRecoilValue(npfOptListState);
	useEffect(() => {
		let tmp = price + exterior.price;
		for(let i = 0; i < selectListOpt.length; i++) {
			if (selectOpt.get(selectListOpt[i].code) === true) {
				tmp += selectListOpt[i].price;
			}
		}
		for(let i = 0; i < hgaListOpt.length; i++) {
			if (hgaOpt.get(hgaListOpt[i].code) === true) {
				tmp += hgaListOpt[i].price;
			}
		}
		setTotalPrice(tmp);
	}, [price, exterior, selectListOpt, selectOpt, hgaListOpt, hgaOpt, npfListOpt, npfOpt])
	return totalPrice;
}