import { styled } from 'styled-components';
import Modal from './Modal';
import { FlexDiv, FlexLi, FlexLiItem, FlexUl } from '../styled/Flex';
import { TrimChangeModalDataType } from '../../type/ApiResponseType';
import { useRecoilValue } from 'recoil';
import { priceState } from '../../utils/recoil/price';

const PopupHeader = styled.div`
  margin-bottom: 30px;
`;

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
const OptionList = styled(FlexLi)`
  justify-content: space-between;
  text-align: left;
  padding: 15px 20px;
`;

function TrimBox({ trimName, price }: { trimName: string; price: number }) {
  return (
    <div>
      <p>{trimName}</p>
      <p>{price}</p>
    </div>
  );
}

export default function TrimChangeModal({
  colorName,
  setModal,
  data,
}: {
  colorName: string;
  setModal: any;
  data: TrimChangeModalDataType;
}) {
  let addPrice = 0;
  let delPrice = 0;
  data.changeOptionInfo?.addOptions.map((item, id) => {
    addPrice += item.price;
  });
  data.changeOptionInfo?.delOptions.map((item) => {
    delPrice += item.price;
  });
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
              <FlexLiItem>
                <b>현재 트림</b>
                <TrimBox
                  trimName={data.changeTrimInfo?.beforeTrimName || 'null'}
                  price={data.changeTrimInfo?.beforeCarPrice || 0}
                ></TrimBox>
              </FlexLiItem>
              <FlexLiItem>
                <b>변경 트림</b>
                <TrimBox
                  trimName={data.changeTrimInfo?.changeTrimName || 'null'}
                  price={data.changeTrimInfo?.changeCarPrice || 0}
                />
              </FlexLiItem>
            </FlexTrim>
            {(data.changeOptionInfo?.addOptions.length || 0) > 0 && (
              <div>
                <p style={{ marginBottom: '20px' }}>
                  변경 시 선택 추가되는 품목
                </p>
                <ul>
                  {data.changeOptionInfo?.addOptions.map((item, id) => {
                    return (
                      <OptionList>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                      </OptionList>
                    );
                  })}
                </ul>
              </div>
            )}
            {(data.changeOptionInfo?.delOptions.length || 0) > 0 && (
              <div>
                <p style={{ marginBottom: '20px' }}>
                  변경 시 선택 해제되는 품목
                </p>

                <ul>
                  {data.changeOptionInfo?.delOptions.map((item, id) => {
                    return (
                      <OptionList>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                      </OptionList>
                    );
                  })}
                </ul>
              </div>
            )}
            <FlexDiv
              style={{ justifyContent: 'space-between', marginTop: '40px' }}
            >
              <p>변경 금액</p>
              <p>
                {data.changeTrimInfo?.changeCarPrice &&
                  data.changeTrimInfo?.changeCarPrice -
                    data.changeTrimInfo.beforeCarPrice +
                    addPrice -
                    delPrice}
              </p>
            </FlexDiv>
						<a href={`/cars/estimation/models/making?modelId=${data.changeTrimInfo?.changeModelId}&carCode=${data.changeTrimInfo?.changeCarCode}&trimCode=${data.changeTrimInfo?.changeTrimCode}`}>
							<button>확인</button>
						</a>
          </TrimWrap>
        </div>
      </div>
    </Modal>
  );
}
