import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProtectPage } from './pages/ProtectPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'login', Component: LoginPage },
      { path: 'signup', Component: SignupPage },
      { path: 'protect', Component: ProtectPage },
    ],
  },
]);