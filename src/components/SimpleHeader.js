import { Link } from "react-router-dom";
import Head from "./styled/Head";
import Logo from "./styled/Logo";

function SimpleHeader(props) {
	return (
		<Head>
			<div>
				<Link to='/'>
					<Logo type="button" name="hyundai"/>
				</Link>
			</div>
		</Head>
	)
}

export default SimpleHeader;