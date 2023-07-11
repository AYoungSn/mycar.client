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
    let tmp = price + exterior.price;
		[...detailListOpt].map(([key, value], id) => {
			if (detailOpt.get(value.code || '') === true) {
				tmp += value.price || 0;
			}
		});
		[...hgaListOpt].map(([key, value], id) => {
			if (hgaOpt.get(value.code || '') === true) {
				tmp += value.price || 0;
			}
		});
		[...npfListOpt].map(([key, value], id) => {
			if (npfOpt.get(value.code || '') === true) {
				tmp += value.price || 0;
			}
		})
    setTotalPrice(tmp);
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
