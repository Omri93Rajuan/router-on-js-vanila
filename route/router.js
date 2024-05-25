export default class Router {
  routes = {};

  constructor(routes) {
    this.routes = routes;
    this.bindRoutes();
    window.addEventListener('popstate', this.loadRoute.bind(this));
  }

  bindRoutes() {
    const routeKeys = Object.keys(this.routes);
    routeKeys.forEach(route => {
      const regexp = new RegExp(`^${route.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);
      this.routes[route] = { ...this.routes[route], regexp };
    });
  }

  getRoute() {
    const [url, queryParams] = location.hash.split('?');
    const path = url.slice(1) || '/';
    const foundRoute = Object.entries(this.routes).find(([route, { regexp }]) => {
      const match = path.match(regexp);
      if (match) {
        match.slice(1).forEach((param, idx) => {
          this.routes[route].params = { ...this.routes[route].params, [route.split('/')[idx + 1].slice(1)]: param };
        });
      }
      return match;
    });

    if (!foundRoute) return this.routes['/404'];

    const [matchedRoute, { component, params }] = foundRoute;
    return { component, params, queryParams };
  }

  loadRoute() {
    const { component, params, queryParams } = this.getRoute();
    const renderedComponent = new component().render(params, queryParams);
    document.getElementById('app').innerHTML = renderedComponent;
  }

  renderComponent(component, props = {}) {
    const renderedComponent = new component().render(props);
    document.getElementById('app').innerHTML = renderedComponent;
  }

  navigate(path) {
    window.history.pushState({}, '', `#${path}`);
    this.loadRoute();
  }
}