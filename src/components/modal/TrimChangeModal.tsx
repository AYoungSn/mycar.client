import { styled } from 'styled-components';
import Modal from './Modal';
import { FlexDiv, FlexLiItem, FlexUl } from '../styled/Flex';
import { TrimChangeModalDataType } from '../../type/ApiResponseType';
import ChangeOptionList from './options/ChangeOptionList';
import { ConfirmBtn, PopupHeader } from '../styled/Modal';
import ChangePrice from './options/ChangePrice';

const TrimWrap = styled.div`
  overflow: hidden;
  margin-bottom: 30px;
  & > ul > li > div {
    padding: 25px 40px;
    background: #f6f3f2;
  }
  & > ul > li > b {
    display: inline-block;
    margin: 30px 0;
  }
`;

const FlexTrim = styled(FlexUl)`
  justify-content: space-between;
  font-family: 'HyundaiSansTextKR';
  font-size: 16px;
  margin-bottom: 20px;
`;


function TrimBox({ title, trimName, price }: { title: string; trimName: string; price: number }) {
  return (
		<FlexLiItem>
			<b>{title}</b>
			<div>
				<p>{trimName}</p>
				<p>{price} 원</p>
    	</div>
    </FlexLiItem>
  );
}

export default function TrimChangeModal({
  colorName,
  data,
}: {
  colorName: string;
  data: TrimChangeModalDataType;
}) {
  let addPrice = 0;
  let delPrice = 0;
  data.changeOptionInfo?.addOptions.map((item) => addPrice += item.price);
  data.changeOptionInfo?.delOptions.map((item) => delPrice += item.price);
  return (
    <Modal>
      <div>
        <PopupHeader>
          <h3>{colorName}색상은 트림 변경 후 선택 가능합니다.</h3>
        </PopupHeader>
        <div>
          <p>트림을 변경하시겠습니까?</p>
          <TrimWrap>
            <FlexTrim>
              <TrimBox title='현재 트림' 
								trimName={data.changeTrimInfo?.beforeTrimName || 'null'}
								price={data.changeTrimInfo?.beforeCarPrice || 0}/>
							<TrimBox title='변경 트림' 
								trimName={data.changeTrimInfo?.changeTrimName || 'null'}
								price={data.changeTrimInfo?.changeCarPrice || 0}/>
            </FlexTrim>
            {(data.changeOptionInfo?.addOptions.length || 0) > 0 && (
              <ChangeOptionList change='add' optionList={data.changeOptionInfo?.addOptions || null} />
            )}
            {(data.changeOptionInfo?.delOptions.length || 0) > 0 && (
							<ChangeOptionList change='del' optionList={data.changeOptionInfo?.delOptions || null} />
            )}
            <ChangePrice changePrice={(data.changeTrimInfo?.changeCarPrice &&
							data.changeTrimInfo?.changeCarPrice -
								data.changeTrimInfo.beforeCarPrice +
								addPrice -
								delPrice) || 0}/>
						<a href={`/cars/estimation/models/making?modelId=${data.changeTrimInfo?.changeModelId}&carCode=${data.changeTrimInfo?.changeCarCode}&trimCode=${data.changeTrimInfo?.changeTrimCode}`}>
							<ConfirmBtn>확인</ConfirmBtn>
						</a>
          </TrimWrap>
        </div>
      </div>
    </Modal>
  );
}
