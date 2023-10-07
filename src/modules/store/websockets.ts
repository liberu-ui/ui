```typescript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

/**
 * Initializes the Echo instance.
 * @param config - The configuration object.
 * @param csrfToken - The CSRF token.
 */
const initializeEcho = (config: Config, csrfToken: string): void => {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: config.key,
        cluster: config.pusher.options.cluster,
        useTLS: config.pusher.options.useTLS,
        namespace: 'App.Events',
        csrfToken,
        authEndpoint: config.authEndpoint,
    });
}

// Configuration object interface
interface Config {
    channels: string;
    pusher: PushConfig;
    authEndpoint: string;
}

// Pusher configuration interface
interface PushConfig {
    key: string;
    options: {
        cluster: string;
        useTLS: boolean;
    };
}

// State interface
interface State {
    authEndpoint: string | null;
    channels: string | null;
    pusher: PushConfig | null;
}

// Getters interface
interface Getters {
    channels: (state: State) => string | null;
}

// Mutations interface
interface Mutations {
    configure: (state: State, config: Config) => void;
}

// Actions interface
interface Actions {
    connect: (context: Context) => Promise<void>;
}

// Context interface
interface Context {
    state: State;
    rootState: RootState;
}

// RootState interface
interface RootState {
    meta: {
        csrfToken: string;
    };
}

export const state: State = {
    authEndpoint: null,
    channels: null,
    pusher: null,
};

export const getters: Getters = {
    channels: state => state.channels,
};

export const mutations: Mutations = {
    configure: (state, config) => {
        state.channels = config.channels;
        state.pusher = config.pusher;
        state.authEndpoint = config.authEndpoint;
    },
};

export const actions: Actions = {
    connect: async ({ state, rootState }) => {
        if (!window.Echo) {
            await initializeEcho(state, rootState.meta.csrfToken);
        }
    },
};
```