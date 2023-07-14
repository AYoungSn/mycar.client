import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TrimModelList from './pages/estimation/TrimModelList';
import Home from './pages/Home';
import MakeCar from './pages/estimation/making/MakeCar';
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
