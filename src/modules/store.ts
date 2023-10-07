import axios, { AxiosResponse } from 'axios';
import App from '../core/app';
import Sentry from './sentry';
import router from '../core/services/router';
import storeImporter from './importers/storeImporter';
import bootEnums from './plugins/bootEnums';
import i18n from './plugins/i18n';
import { Router } from 'vue-router';

// Define the modules object with its property types
type Modules = {
    [key: string]: any;
};

// Define the state object with its property types
type State = {
    appState: boolean;
    appUpdate: boolean;
    enums: any;
    guestState: boolean;
    impersonating: null | string;
    meta: any;
    requests: { method: string; url: string }[];
    routes: any;
    showQuote: boolean;
    user: any;
    avatarKey: number;
};

// Define the getters object with its property types
type Getters = {
    route: any;
    routes: string[];
    isWebview: () => boolean;
    requests: number;
    requestIndex: (params: { url: string; method: string }) => number;
};

// Define the mutations object with its property types
type Mutations = {
    addRequest: (state: State, payload: { method: string; url: string }) => void;
    appState: (state: State, value: boolean) => void;
    guestState: (state: State, value: boolean) => void;
    newRelease: (state: State) => void;
    removeRequest: (state: State, index: number) => void;
    setDefaultRoute: (state: State, route: string) => void;
    setEnums: (state: State, enums: any) => void;
    setImpersonating: (state: State, impersonating: string | null) => void;
    setMeta: (state: State, meta: any) => void;
    setPageTitle: (state: State, title: string) => void;
    setRoutes: (state: State, routes: any) => void;
    setShowQuote: (state: State, value: boolean) => void;
    setUser: (state: State, user: any) => void;
    updateAvatar: (state: State) => void;
};

// Define the actions object with its property types
type Actions = {
    loadAppState: ({ state, commit, dispatch }: { state: State; commit: any; dispatch: any }) => void;
    loadGuestState: ({ commit, getters }: { commit: any; getters: Getters }) => void;
    setPageTitle: ({ commit }: { commit: any }, title: string) => void;
};

/**
 * Import and initialize Vuex store modules.
 * @returns The imported and initialized Vuex store modules.
 */
const importAndInitializeModules = (): Modules => {
    const modules = storeImporter(require.context('./store', false, /.*\.ts$/));
    return modules;
};

/**
 * The app's Vuex store state.
 */
const state: State = {
    appState: false,
    appUpdate: false,
    enums: {},
    guestState: false,
    impersonating: null,
    meta: {},
    requests: [],
    routes: {},
    showQuote: false,
    user: {},
    avatarKey: 1,
};

/**
 * The app's Vuex store getters.
 */
const getters: Getters = {
    route: (state: State) => router.currentRoute.value,
    routes: (state: State) => Object.keys(state.routes),
    isWebview: () => typeof ReactNativeWebView !== 'undefined',
    requests: (state: State) => state.requests.length,
    requestIndex: (state: State) => ({ url, method }) =>
        state.requests.findIndex((request) => method === request.method && url === request.url),
};

/**
 * The app's Vuex store mutations.
 */
const mutations: Mutations = {
    addRequest: (state: State, { method, url }) => state.requests.push({ method, url }),
    appState: (state: State, value: boolean) => (state.appState = value),
    guestState: (state: State, value: boolean) => (state.guestState = value),
    newRelease: (state: State) => (state.appUpdate = true),
    removeRequest: (state: State, index: number) => state.requests.splice(index, 1),
    setDefaultRoute: (state: State, route: string) =>
        router.addRoute({
            name: 'default',
            path: '/',
            redirect: { name: route },
        }),
    setEnums: (state: State, enums: any) => (state.enums = bootEnums(enums, i18n)),
    setImpersonating: (state: State, impersonating: string | null) => (state.impersonating = impersonating),
    setMeta: (state: State, meta: any) => (state.meta = meta),
    setPageTitle: (state: State, title: string) => (state.meta.pageTitle = title),
    setRoutes: (state: State, routes: any) => (state.routes = routes),
    setShowQuote: (state: State, value: boolean) => (state.showQuote = value),
    setUser: (state: State, user: any) => (state.user = user),
    updateAvatar: (state: State) => state.avatarKey++,
};

/**
 * The app's Vuex store actions.
 */
const actions: Actions = {
    loadAppState: ({ state, commit, dispatch }) => {
        commit('appState', false);

        axios
            .get('/api/core/home')
            .then(({ data }: AxiosResponse) => {
                data.forEach(({ mutation, state }: { mutation: string; state: any }) => commit(mutation, state));

                commit('layout/sidebar/update', state.preferences.global.expandedSidebar);
                window.Laravel = state.meta.csrfToken;

                if (state.meta.sentryDsn) {
                    const sentry = new Sentry(App.instance, App.router);
                    sentry.init(state);
                }

                dispatch('layout/setTheme').then(() => commit('appState', true));

                if (state.meta.env === 'local') {
                    window.http = axios;
                }
            })
            .catch((error: any) => {
                if (error.response && error.response.status === 401) {
                    commit('auth/logout');
                    router.push({ name: 'login' });
                } else {
                    throw error;
                }
            });
    },
    loadGuestState: ({ commit, getters }) => {
        axios
            .get('/api/meta', {
                params: { locale: localStorage.getItem('locale') },
            })
            .then(({ data }: AxiosResponse) => {
                const { meta, i18n, routes } = data;
                const lang = Object.keys(i18n).shift();

                commit('localisation/setI18n', i18n);
                commit('preferences/lang', lang);
                commit('setMeta', meta);
                commit('setRoutes', routes);
                commit('guestState', true);

                const loginRoutes = ['login', 'password.email', 'password.reset'];

                if (!getters.route || !loginRoutes.includes(getters.route.name)) {
                    router.push({ name: 'login' });
                }
            });
    },
    setPageTitle: ({ commit }, title: string) => {
        commit('setPageTitle', title);
        commit('bookmarks/title', title);
    },
};

export { modules: importAndInitializeModules(), state, getters, mutations, actions };