import { createHashRouter } from 'react-router-dom';
import App from './App';
import CountryDetailPage from './pages/CountryDetailPage';
import FavoritePage from './pages/FavoritePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/country/:code',
        element: <CountryDetailPage />,
      },
      {
        path: '/favorite',
        element: <FavoritePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);
export default router;
