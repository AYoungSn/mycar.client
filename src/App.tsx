import { RecoilRoot } from 'recoil';
import EstimationModel from './pages/estimation/EstimationModel';
import Home from './pages/Home';
import MakeCar from './pages/estimation/MakeCar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ModalProvider from './components/modal/ModalProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cars/estimation/model',
    element: <EstimationModel />,
  },
  {
    path: '/cars/estimation/models/making',
    element: <MakeCar />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
      <ModalProvider />
    </RecoilRoot>
  );
}
export default App;
