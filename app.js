import Router from './route/router.js';
import routes from './route/routes.js';

const router = new Router(routes);

function navigation(router) {
  const homeBtn = document.getElementById('homeBtn');
  homeBtn.addEventListener('click', () => router.navigate('/'));

  const aboutBtn = document.getElementById('aboutBtn');
  aboutBtn.addEventListener('click', () => router.navigate('/about'));

  const userProfileBtn = document.getElementById('userProfileBtn');
  userProfileBtn.addEventListener('click', () => router.navigate('/users/123'));
}

navigation(router);