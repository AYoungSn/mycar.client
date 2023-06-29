import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EstimationModel from "./pages/EstimationModel";
import Home from "./pages/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home/>
	},
	{
		path: "/estimation/model",
		element: <EstimationModel/>
	}
])

function App() {
	return (
	<>
		<RouterProvider router={router}/>
	</>
	)
}
export default App;