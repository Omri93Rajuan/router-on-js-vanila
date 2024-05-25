import HomePage from '../pages/home.js';
import AboutPage from '../pages/about.js';
import NotFoundPage from '../pages/404.js';

const routes = {
  '/': { component: HomePage },
  '/about': { component: AboutPage },
  '/404': { component: NotFoundPage }
};

export default routes;