import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";

function EstimationModel() {
	const [searchParams, setSearchParmas] = useSearchParams();
	return (
		<div>
			<Header carId={searchParams.get('carId')}></Header>
		</div>
	);
}
export default EstimationModel;