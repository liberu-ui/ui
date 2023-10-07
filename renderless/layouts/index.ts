/**
 * This file exports three layout components: Auth, Default, and Home.
 */
 
import AuthLayout from '../../src/core/layouts/Auth.vue';
import DefaultLayout from '../../src/core/layouts/Default.vue';
import HomeLayout from '../../src/core/layouts/Home.vue';

/**
 * Represents the Auth layout component.
 * @typedef {import('../../src/core/layouts/Auth.vue').default} AuthLayout
 */

/**
 * Represents the Default layout component.
 * @typedef {import('../../src/core/layouts/Default.vue').default} DefaultLayout
 */

/**
 * Represents the Home layout component.
 * @typedef {import('../../src/core/layouts/Home.vue').default} HomeLayout
 */

/**
 * Exports the Auth layout component.
 * @type {AuthLayout}
 */
export const Auth: AuthLayout = AuthLayout;

/**
 * Exports the Default layout component.
 * @type {DefaultLayout}
 */
export const Default: DefaultLayout = DefaultLayout;

/**
 * Exports the Home layout component.
 * @type {HomeLayout}
 */
export const Home: HomeLayout = HomeLayout;