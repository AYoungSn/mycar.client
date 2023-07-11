import { FlexDiv } from "../../styled/Flex";

export default function ChangePrice({changePrice}:{changePrice: number}) {
	return (<FlexDiv
		style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '30px' }}
	>
		<p>변경 금액</p>
		<p>
			{changePrice}
		</p>
	</FlexDiv>)
}