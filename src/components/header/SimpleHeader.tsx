import { Link } from "react-router-dom";
import { Head, HeaderWrap } from "../styled/Head";
import Logo from "../styled/Logo";

function SimpleHeader() {
	return (
		<HeaderWrap>
			<Head>
				<div>
					<Link to='/'>
						<Logo type="button" name="hyundai"/>
					</Link>
				</div>
			</Head>
		</HeaderWrap>
	)
}

export default SimpleHeader;