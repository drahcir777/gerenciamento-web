import { createBrowserRouter } from 'react-router-dom';
import { CadastroFazenda } from './app/cadastroFazendaScreen';
import { SignInScreen } from './auth/signInScreen';
import { AppLayoyt } from './_layouts/app';
import { AuthLayout } from './_layouts/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayoyt />,
    children: [
      {
        path: '/',
        element: <CadastroFazenda />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInScreen />,
      },
    ],
  },
]);
