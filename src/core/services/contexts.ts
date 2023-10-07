/**
 * This code defines an object with multiple properties, each representing a specific context.
 * The context is created using the `require.context` function, which allows dynamically
 * importing modules from a specific directory with a specific file pattern.
 */

interface BulmaContext {
  coreRoutes: __WebpackModuleApi.RequireContext;
  icons: __WebpackModuleApi.RequireContext;
  register: __WebpackModuleApi.RequireContext;
  routes: __WebpackModuleApi.RequireContext;
}

interface CommonContext {
  store: __WebpackModuleApi.RequireContext;
}

interface LocalContext {
  store: __WebpackModuleApi.RequireContext;
  routes: __WebpackModuleApi.RequireContext;
}

interface ModuleContexts {
  bulma: BulmaContext;
  common: CommonContext;
  local: LocalContext;
}

/**
 * The default export of the module is an object containing multiple contexts.
 */
const moduleContexts: ModuleContexts = {
  bulma: {
    coreRoutes: require.context('../../bulma/routes', false, /.*\.ts$/),
    icons: require.context('../../../../..', true, /src\/icons\.ts$/),
    register: require.context('../../../../..', true, /src\/bulma\/register\.ts$/),
    routes: require.context('../../../..', true, /src\/bulma\/routes\/\w+\.ts$/),
  },
  common: {
    store: require.context('../../../..', true, /src\/store\/\w+\.ts$/),
  },
  local: {
    store: require.context('@root/store', false, /.*\.ts$/),
    routes: require.context('@root/routes', false, /.*\.ts$/),
  },
};

export default moduleContexts;
