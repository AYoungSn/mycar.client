import { useRecoilValue } from 'recoil';
import { priceState } from '../utils/recoil/price';
import {
  exteriorState,
  hgaOptListState,
  hgaOptState,
  npfOptListState,
  npfOptState,
  selectOptListState,
  selectOptState,
} from '../utils/recoil/options';
import { useEffect, useState } from 'react';

export default function useUpdatePrice() {
  const price = useRecoilValue(priceState);
  const [totalPrice, setTotalPrice] = useState(price);
  const exterior = useRecoilValue(exteriorState);
  const selectOpt = useRecoilValue(selectOptState);
  const selectListOpt = useRecoilValue(selectOptListState);
  const hgaOpt = useRecoilValue(hgaOptState);
  const hgaListOpt = useRecoilValue(hgaOptListState);
  const npfOpt = useRecoilValue(npfOptState);
  const npfListOpt = useRecoilValue(npfOptListState);
  useEffect(() => {
    let tmp = price + exterior.price;
		[...selectListOpt].map(([key, value], id) => {
			if (selectOpt.get(value.code || '') === true) {
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
    selectListOpt,
    selectOpt,
    hgaListOpt,
    hgaOpt,
    npfListOpt,
    npfOpt,
  ]);
  return totalPrice;
}
