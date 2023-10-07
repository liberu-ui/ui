/**
 * This is a TypeScript code file that converts the given JavaScript code to TypeScript.
 */

import Router from '../pages/Router.vue';

/**
 * Represents the route for the 'system' path.
 */
export default {
    /**
     * The path for the 'system' route.
     */
    path: '/system',
  
    /**
     * The component to be rendered for the 'system' route.
     */
    component: Router,
  
    /**
     * Meta information for the 'system' route.
     */
    meta: {
        /**
         * The breadcrumb label for the 'system' route.
         */
        breadcrumb: 'system'
    },
  
    /**
     * The child routes for the 'system' route.
     */
    children: [],
};