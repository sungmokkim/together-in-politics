import App from './App';
import HomePage from './pages/HomePage';
import DashBoardPage from './pages/DashBoardPage';
import NotFoundPage from './pages/NotFoundPage';
import FreeBoardPage from './pages/FreeBoardPage';
import KeywordsPage from './pages/KeywordsPage';
import RankingPage from './pages/RankingPage';
import AboutPage from './pages/AboutPage';

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
      ,
      {
        ...FreeBoardPage,
        path: '/freeboard'
      },
      {
        ...KeywordsPage,
        path: '/keywords'
      },
      {
        ...RankingPage,
        path: '/rankings'
      },
      {
        ...AboutPage,
        path: '/about'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
