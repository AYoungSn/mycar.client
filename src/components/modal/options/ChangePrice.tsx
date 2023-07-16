import PricePrint from "../../../utils/PricePrint";
import { FlexDiv } from "../../styled/Flex";

export default function ChangePrice({changePrice}:{changePrice: number}) {
	return (<FlexDiv
		style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '30px' }}
	>
		<p>변경 금액</p>
		<p>
			{PricePrint(changePrice)}
		</p>
	</FlexDiv>)
}