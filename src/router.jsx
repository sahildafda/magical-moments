import { createBrowserRouter, Navigate } from 'react-router-dom';
import LovePage from './pages/LovePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/sahil-kirti" replace />
  },
  {
    path: '/:coupleId',
    element: <LovePage />
  },
  {
    path: '*',
    element: <Navigate to="/sahil-kirti" replace />
  }
]);
