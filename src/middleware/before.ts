/**
 * This file exports a function that acts as a middleware for route navigation in a Vue.ts application.
 * The function checks if the user is authenticated or not, and based on that, it calls either the "auth" function 
 * or the "guest" function, which are imported from separate files. The function receives four parameters: 
 * "to" (the target route), "from" (the current route), "next" (a callback to move to the next route), and "store" 
 * (the Vuex store object).
 * 
 * @param to - The target route.
 * @param from - The current route.
 * @param next - A callback to move to the next route.
 * @param store - The Vuex store object.
 */
import guest from './before/guest';
import auth from './before/auth';
import { Route, NavigationGuardNext } from 'vue-router';
import { Store } from 'vuex';

export default (to: Route, from: Route, next: NavigationGuardNext, store: Store<any>) => {
    if (store.state.auth.isAuth) {
        auth(to, from, next, store);
    } else {
        guest(to, from, next, store);
    }
};