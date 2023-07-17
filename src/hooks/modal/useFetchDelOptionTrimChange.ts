import { useEffect, useState } from "react";
import MakeOptionCodeList from "../../utils/makeOptionCodeList";
import { OptionType } from "../../type/optionType";
import { optionsApi } from "../../utils/Api";
import { useRecoilValue } from "recoil";
import { modelState } from "../../utils/recoil/carInfo";
import { ChangeTrimType, Trim } from "../../type/ApiResponseType";
import { detailOptState } from "../../utils/recoil/options";

export default function useFetchDelOptionTrimChange(selectName: string, selectModel: Trim) {
	const [delOptions, setDelOptions] = useState<OptionType[]>([]);
	const [delPrice, setDelPrice] = useState<number>(0);
	const model = useRecoilValue(modelState);
	const detailOpts = useRecoilValue(detailOptState);
	useEffect(() => {
		const optionCodes = MakeOptionCodeList(detailOpts);
		async function fetchDelOptions() {
			const data: ChangeTrimType = (await optionsApi.trimChange(model.modelId, selectModel.modelId, optionCodes)).data;
			setDelOptions(data.delOptions);
			const price = data.delOptions.map((item: OptionType) => {
				return item.price;
			}).reduce((acc: number, cur: number) => (acc || 0) + (cur || 0), 0);
			setDelPrice(price);
		}
		fetchDelOptions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectModel, selectName]);
	return ({ delOptions, delPrice });
}