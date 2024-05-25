export default class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('popstate', this.renderRoute.bind(this));
  }

  renderRoute() {
    const path = location.hash.slice(1) || '/';
    const route = this.routes[path] || this.routes['/404'];
    const componentInstance = new route.component();
    const renderedComponent = componentInstance.render(route.params || {});
    document.getElementById('app').innerHTML = renderedComponent;
  }

  navigate(path) {
    window.history.pushState({}, '', `#${path}`);
    this.renderRoute();
  }
}
