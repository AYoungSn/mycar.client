import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { OptionHead, OptionName } from '../styled/Option';
import { OptionList } from './OptionList';
import {
	hgaInitListState,
  hgaOptListState,
  hgaOptState,
  npfOptListState,
  npfOptState,
  detailInitListState,
  detailOptListState,
  detailOptState,
} from '../../utils/recoil/options';
import { optionUpdate } from '../../utils/optionUpdate';
import { OptionChoiceType } from '../../type/optionType';
import { useSearchParams } from 'react-router-dom';
import { carsApi } from '../../utils/Api';
import MakeOptionCodeList from '../../utils/makeOptionCodeList';
import { useFetchSelectList, useFetchTuixList } from '../../hooks/useFetchOptions';
import { modalState } from '../../utils/recoil/modal';

type Props = {
  name: string;
  options: Map<string, OptionChoiceType>;
  curOptions: Map<string, boolean>;
  onChange: any;
	disableOnChange?: any;
};
function OptionItemList(props: Props) {
  return (
    <div>
      <OptionName marginTop="0" textAlign="left">
        {props.name}
      </OptionName>
      <OptionList
        options={props.options}
        curOptions={props.curOptions}
        onChange={props.onChange}
				disableOnChange={props.disableOnChange}
      />
    </div>
  );
}

async function disableOnChange(key: string, modelId: number, detailOpts: Map<string, boolean>, setModal: any) {
	const data = (await carsApi.optionsChange(modelId, MakeOptionCodeList(detailOpts), key)).data;
	if (data.addOptions.length + data.delOptions.length >= 2) {
		setModal({
			modalName: 'CHANGE-OPTION',
			detail: key,
			changeOptionData: data
		})
	}
}

export function Options() {
  const [detailListOpts, setDetailListOpts] =
    useRecoilState<Map<string, OptionChoiceType>>(detailOptListState);
	const detailListInit = useRecoilValue(detailInitListState);
	const hgaListInit = useRecoilValue(hgaInitListState);
  const [detailOpts, setDetailOpts] = useRecoilState(detailOptState);
  const [hgaListOpts, setHgaListOpts] = useRecoilState(hgaOptListState);
  const [hgaOpts, setHgaOpts] = useRecoilState(hgaOptState);
  const [npfListOpts, setNpfListOpts] = useRecoilState(npfOptListState);
  const [npfOpts, setNpfOpts] = useRecoilState(npfOptState);
	const [searchParams] = useSearchParams();
	const modelId = Number(searchParams.get('modelId'));
	const setModal = useSetRecoilState(modalState);
	useFetchSelectList(modelId, detailOpts, setDetailListOpts, detailListInit);
	useFetchTuixList(modelId, hgaOpts, setHgaListOpts, hgaListInit);

  return (
    <div>
      <OptionHead>옵션</OptionHead>
			{ detailListOpts.size > 0 && 
      <OptionItemList
        options={detailListOpts}
        curOptions={detailOpts}
        name="상세 품목" 
				disableOnChange={(key:string) => {
					disableOnChange(key, modelId, detailOpts, setModal);
				}} 
        onChange={(key: string) => {
          optionUpdate(key, detailOpts.get(key) || false, setDetailOpts);
        }}
      />
			}
      {hgaListOpts.size > 0 && (
        <OptionItemList
          options={hgaListOpts}
          curOptions={hgaOpts}
          name="H Genuine Accessories"
          onChange={(key: string) => {
            optionUpdate(key, hgaOpts.get(key) || false, setHgaOpts);
          }}
					disableOnChange={(e: React.MouseEvent<HTMLButtonElement>) => {
						e.preventDefault();
					}}
        />
      )}
      {npfListOpts.size > 0 && (
        <OptionItemList
          options={npfListOpts}
          curOptions={npfOpts}
          name="N Performance Parts"
          onChange={(key: string) => {
            // 현재 선택된 옵션을 기반으로 선택 가능한 항목인지 조회
            // 옵션 선택 시 선택 불가한 다른 항목 조회
            optionUpdate(key, npfOpts.get(key) || false, setNpfOpts);
          }}
					disableOnChange={(e: React.MouseEvent<HTMLButtonElement>) => {
						e.preventDefault();
					}}
        />
      )}
    </div>
  );
}
