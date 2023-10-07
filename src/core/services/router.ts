/**
 * Imports
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RouteBuilder from './routeBuilder';
import store from './store';
import before from '../../middleware/before';

/**
 * Router creation
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: new RouteBuilder().handle(),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

/**
 * Global navigation guard
 * 
 * @param to - The target route object being navigated to
 * @param from - The current route object being navigated away from
 * @param next - A function that must be called to resolve the hook, must be called to continue the navigation
 */
router.beforeEach((to, from, next) => before(to, from, next, store));

/**
 * Error handling for failed lazy-loaded chunks
 * 
 * @param error - The error object
 */
router.onError(error => {
  const regExp = new RegExp('Loading chunk chunk-\\w* failed.');
  
  if (!regExp.test(error.message)) {
    throw error;
  }
});

export default router as ReturnType<typeof createRouter>;
