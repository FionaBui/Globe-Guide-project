import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Importing routing-related functions from react-router-dom
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

// Importing main App component and pages
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';
import CountryDetailPage from './pages/CountryDetailPage.tsx';
import FavoritePage from './pages/FavoritePage.tsx';

// Creating the router with nested routes using Hash routing
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