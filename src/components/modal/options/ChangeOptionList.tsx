import { styled } from "styled-components";
import { OptionType } from "../../../type/optionType";
import { FlexLi } from "../../styled/Flex";
const OptionList = styled(FlexLi)`
  justify-content: space-between;
  text-align: left;
  padding: 15px 20px;
	borderTop: 1px solid #7c8191;
`;
function ChangeOptionList({change, optionList}:{change: 'add' | 'del', optionList: OptionType[] | null}) {
	return (<div>
		<p style={{ marginBottom: '20px', marginTop: '20px' }}>
      변경 시 선택 {change === 'add' ? '추가' : '해제'}되는 품목
    </p>
		<ul style={{borderTop: "2px solid #7c8191"}}>
			{optionList?.map((item) => {
				return(
					<OptionList key={item.code}>
						<p>{item.name}</p>
						<p>{item.price} 원</p>
					</OptionList>
				)
			})}
		</ul>
	</div>)
}

export default ChangeOptionList;