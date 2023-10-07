/**
 * Import the Router component from the Router.vue file
 */
const Router = (): Promise<any> => import('../pages/Router.vue');

export default {
  /**
   * The path for the administration route
   */
  path: '/administration',

  /**
   * The component for the administration route
   * @type {Promise<any>}
   */
  component: Router,

  /**
   * Meta information for the administration route
   */
  meta: {
    /**
     * The breadcrumb for the administration route
     * @type {string}
     */
    breadcrumb: 'administration',
  },

  /**
   * The child routes for the administration route
   */
  children: [],
};
