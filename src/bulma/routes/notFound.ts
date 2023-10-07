```
import { RouteRecordRaw } from 'vue-router';

/**
 * Component for displaying the "Not Found" page.
 */
const NotFoundComponent = () => import('../pages/NotFound.vue');

/**
 * Route configuration for the "Not Found" page.
 */
const notFoundRoute: RouteRecordRaw = {
  /**
   * Name of the route.
   */
  name: 'notFound',

  /**
   * Path for the route.
   */
  path: '/404',

  /**
   * Alias for the route path.
   */
  alias: '/:pathMatch(.*)*',

  /**
   * Component to be rendered for the route.
   */
  component: NotFoundComponent,

  /**
   * Metadata for the route.
   */
  meta: {
    /**
     * Title of the page.
     */
    title: '404',
  },
};

export default notFoundRoute;
```