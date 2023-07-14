import { RecoilRoot } from 'recoil';
import TrimModelList from './pages/estimation/TrimModelList';
import Home from './pages/Home';
import MakeCar from './pages/estimation/making/MakeCar';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import ModalProvider from './components/modal/ModalProvider';
import Estimate from './pages/estimation/making/estimate/Estimate';

function App() {
  return (
    <RecoilRoot>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path='/cars/estimation/models' element={<TrimModelList />} />
					<Route path='/cars/estimation/models/making' element={<MakeCar />} />
					<Route path='/cars/estimation/models/estimate' element={<Estimate />} />
				</Routes>
				<ModalProvider />
			</BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
