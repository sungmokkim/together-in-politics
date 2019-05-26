import App from './App';
import HomePage from './pages/HomePage';
import DashBoardPage from './pages/DashBoardPage';
import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...DashBoardPage,
        path: '/dashboard'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
