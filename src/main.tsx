import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';
import CountryDetailPage from './pages/CountryDetailPage.tsx';
import FavoritePage from './pages/FavoritePage.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/country/:code',
        element: <CountryDetailPage/>
      },
      {
        path: '/favorite',
        element: <FavoritePage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);