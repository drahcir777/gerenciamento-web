import './global.css';
import { router } from './pages/routes';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />;
    </>
  );
}
