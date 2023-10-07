import { createStore, ModuleTree, StoreOptions } from 'vuex';
import Resources, { ResourceStore } from './resources';
import importer from '../../modules/importers/storeImporter';
import { Actions, Getters, Mutations, State } from '../../modules/store';

/**
 * Package the imported store modules
 * @returns {ModuleTree<any>} The packaged store modules
 */
const packageStore = (): ModuleTree<any> => {
    const importedModules = importer(Resources.store());

    return Object.keys(importedModules).reduce((modules, key) => {
        modules[key.split('/').pop()] = importedModules[key];
        return modules;
    }, {});
};

const resources = Resources.localStore();

const storeOptions: StoreOptions<State> = {
    strict: process.env.NODE_ENV !== 'production',
    modules: Object.assign(packageStore(), importer(resources)),
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};

export default createStore(storeOptions);

/**
 * The store state
 */
export interface State {
    // state properties
}

/**
 * The store getters
 */
export interface Getters {
   // getter methods
}

/**
 * The store mutations
 */
export interface Mutations {
   // mutation methods
}

/**
 * The store actions
 */
export interface Actions {
   // action methods
}

/**
 * The imported resources
 */
export interface Resources {
    store(): ResourceStore;
    localStore(): any;
}