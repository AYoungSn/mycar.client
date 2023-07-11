import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { OptionHead, OptionName } from '../styled/Option';
import { OptionList } from './OptionList';
import {
	hgaInitListState,
  hgaOptListState,
  hgaOptState,
  npfOptListState,
  npfOptState,
  selectInitListState,
  selectOptListState,
  selectOptState,
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
	disableOnChange: any;
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

async function disableOnChange(key: string, modelId: number, selectOpts: Map<string, boolean>, setModal: any) {
	const data = (await carsApi.optionsChange(modelId, MakeOptionCodeList(selectOpts), key)).data;
	if (data.addOptions.length + data.delOptions.length >= 2) {
		setModal({
			modalName: 'CHANGE-OPTION',
			selectOption: key,
			changeOptionData: data
		})
	}
}

export function Options() {
  const [selectListOpts, setSelectListOpts] =
    useRecoilState<Map<string, OptionChoiceType>>(selectOptListState);
	const selectListInit = useRecoilValue(selectInitListState);
	const hgaListInit = useRecoilValue(hgaInitListState);
  const [selectOpts, setSelectOpts] = useRecoilState(selectOptState);
  const [hgaListOpts, setHgaListOpts] = useRecoilState(hgaOptListState);
  const [hgaOpts, setHgaOpts] = useRecoilState(hgaOptState);
  const [npfListOpts, setNpfListOpts] = useRecoilState(npfOptListState);
  const [npfOpts, setNpfOpts] = useRecoilState(npfOptState);
	const [searchParams] = useSearchParams();
	const modelId = Number(searchParams.get('modelId'));
	const setModal = useSetRecoilState(modalState);
	useFetchSelectList(modelId, selectOpts, setSelectListOpts, selectListInit);
	useFetchTuixList(modelId, hgaOpts, setHgaListOpts, hgaListInit);

	console.log(modelId)
  return (
    <div>
      <OptionHead>옵션</OptionHead>
			{ selectListOpts.size > 0 && 
      <OptionItemList
        options={selectListOpts}
        curOptions={selectOpts}
        name="상세 품목" 
				disableOnChange={(key:string) => {
					disableOnChange(key, modelId, selectOpts, setModal);
				}} 
        onChange={(key: string) => {
          // 현재 선택된 옵션들을 바탕으로 선택 가능한 항목인지 조회
          // 선택 시 중복 선택 불가한 다른 상세품목이 있는지 조회
          // 현재 옵션 선택 시 같이 선택되어야 하는 옵션이 있는지
          // 옵션 선택 시 hga 옵션 목록 재요청
					// selectedOptionChange(key, modelId, selectOpts, setSelectOpts);
          optionUpdate(key, selectOpts.get(key) || false, setSelectOpts);
        }}
      />
			}
      {hgaListOpts.size > 0 && (
        <OptionItemList
          options={hgaListOpts}
          curOptions={hgaOpts}
          name="H Genuine Accessories"
          onChange={(key: string) => {
            // 해당 옵션 선택시 가격 변경
            optionUpdate(key, hgaOpts.get(key) || false, setHgaOpts);
          }}
					disableOnChange={(key:string) => {
						disableOnChange(key, modelId, selectOpts, setModal);
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
					disableOnChange={(key: string) => {
						disableOnChange(key, modelId, selectOpts, setModal);
					}}
        />
      )}
    </div>
  );
}
