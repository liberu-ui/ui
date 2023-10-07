/**
 * Determines if a route is authorized based on the app state and route name.
 * @param {Object} store - The Vuex store object.
 * @param {Object} to - The target route being navigated to.
 * @returns {boolean} - True if the route is authorized, false otherwise.
 */
const isRouteAuthorized = (store: { state: { appState: boolean }, getters: { routes: string[] } }, to: { name: string }): boolean => {
    return !store.state.appState || store.getters.routes.includes(to.name) || exceptions.includes(to.name);
};

/**
 * Middleware function that checks if the route is authorized and handles the navigation accordingly.
 * @param {Object} to - The target route being navigated to.
 * @param {Object} from - The current route being navigated from.
 * @param {Function} next - The function to proceed to the next route.
 * @param {Object} store - The Vuex store object.
 */
export default (to: { meta: { guestGuard: boolean }, name: string }, from: any, next: (param?: any) => void, store: { state: { appUpdate: boolean }, commit: (mutation: string) => void, getters: { routes: string[] } }) => {
    if (to.meta.guestGuard) {
        next({ path: '/' });
    } else if (store.state.appUpdate) {
        next(false);
    } else if (!isRouteAuthorized(store, to)) {
        next({ name: 'unauthorized' });
    } else {
        next();
    }
};