import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Importing routing-related functions from react-router-dom
import { RouterProvider } from 'react-router-dom';

import router from './router.tsx';
import UserProvider from './Store/UserProvider.tsx';
import FavoriteProvider from './Store/FavoriteProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </UserProvider>
  </StrictMode>
);
