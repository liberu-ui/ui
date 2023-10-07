import Resources from './resources';
import routeImporter from '../../modules/importers/routeImporter';

/**
 * Interface for a single route.
 */
interface Route {
  path: string;
  component?: any;
  meta?: any;
  children?: Route[];
}

/**
 * Interface for the resources object.
 */
interface ResourcesObject {
  coreRoutes: () => Route[];
  routes: () => Route[];
  localRoutes: () => Route[];
}

/**
 * Class representing a route builder.
 */
class RouteBuilder {
  private routes: Route[];

  /**
   * Creates a new instance of RouteBuilder.
   */
  constructor() {
    this.routes = routeImporter(Resources.coreRoutes());
  }

  /**
   * Adds the given routes to the existing routes.
   * @param routes - The routes to be added.
   * @param existing - The existing routes.
   * @returns The current instance of RouteBuilder.
   */
  addRoutes(routes: Route[], existing: Route[] = this.routes): RouteBuilder {
    routes.forEach(route => this.processRoute(route, existing));

    return this;
  }

  /**
   * Handles the route building process.
   * @returns The routes after the handling process.
   */
  handleRoutes(): Route[] {
    this.addRoutes(routeImporter(Resources.routes()))
        .addRoutes(routeImporter(Resources.localRoutes()));

    return this.routes;
  }

  /**
   * Processes a single route and updates the existing routes accordingly.
   * @param route - The route to be processed.
   * @param routes - The existing routes.
   */
  private processRoute(route: Route, routes: Route[]): void {
    const match = routes.find(({ path }) => path === route.path);

    if (!match) {
      routes.push(route);
      return;
    }

    if (!route.meta) {
      this.addRoutes(route.children, match.children);
      return;
    }

    if (route.children) {
      match.children = route.children;
    }

    if (route.component) {
      match.component = route.component;
    }

    match.meta = route.meta;
  }
}

export default RouteBuilder;