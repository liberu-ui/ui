import { RouteConfig } from 'vue-router';

/**
 * Component for displaying unauthorized page.
 */
const Unauthorized = () => import('../pages/Unauthorized.vue');

/**
 * Route configuration for unauthorized page.
 */
const unauthorizedRoute: RouteConfig = {
    /**
     * Name of the route.
     */
    name: 'unauthorized',
    /**
     * Path of the route.
     */
    path: '/403',
    /**
     * Component to be rendered for this route.
     */
    component: Unauthorized,
    /**
     * Meta information for the route.
     */
    meta: {
        /**
         * Title of the page.
         */
        title: 'Unauthorized',
    },
};

export default unauthorizedRoute;
