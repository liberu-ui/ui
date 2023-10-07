import storeImporter, { StoreImporter } from '../importers/storeImporter';
import themeImporter, { ThemeImporter } from '../importers/themeImporter';

/**
 * Modules namespace.
 */
export namespace Modules {
  // Define types for modules
  export type HomeModule = any; // Replace `any` with the specific type of the home module
  export type DefaultModule = any; // Replace `any` with the specific type of the default module

  // Define type for modules context
  export type ModulesContext = __WebpackModuleApi.RequireContext;
  
  // Define type for the synced modules
  export type SyncedModules = {
    [key: string]: Function;
  };

  /**
   * Get all the modules from the given context.
   * 
   * @param context The modules context.
   * @returns The synced modules.
   */
  export const getModules = (context: ModulesContext): SyncedModules => {
    const modules: SyncedModules = {};
    context.keys().forEach((key: string) => {
      const moduleKey = key.replace(/^\.\/(.*)\.\w+$/, '$1');
      modules[moduleKey] = context(key).default;
    });
    return modules;
  };
}

/**
 * Themes namespace.
 */
export namespace Themes {
  // Define type for themes context
  export type ThemesContext = __WebpackModuleApi.RequireContext;

  // Define type for themes
  export type Themes = {
    [key: string]: any; // Replace `any` with the specific type of the theme
  };
  
  // Define type for loaded themes
  export type LoadedThemes = {
    [key: string]: any; // Replace `any` with the specific type of the theme
  };

  /**
   * Load the themes from the given context.
   * 
   * @param context The themes context.
   * @returns The loaded themes.
   */
  export const loadThemes = (context: ThemesContext): LoadedThemes => {
    const themes: LoadedThemes = {};
    context.keys().forEach((key: string) => {
      const themeKey = key.replace(/^\.\/(.*)\.\w+$/, '$1');
      themes[themeKey] = context(key);
    });
    return themes;
  };
}

/**
 * State interface.
 */
export interface State {
  home: boolean;
  themes: Themes.LoadedThemes;
  lightsOff: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  footer: boolean;
}

/**
 * Getter interface.
 */
export interface Getters {
  current: (rootState: any) => string; // Replace `any` with the specific type of the root state
}

/**
 * Mutation interface.
 */
export interface Mutations {
  home: (status: boolean) => void;
  setThemes: (themes: Themes.LoadedThemes) => void;
  toggleLights: () => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsTablet: (isTablet: boolean) => void;
  setIsTouch: (isTouch: boolean) => void;
  hideFooter: () => void;
  showFooter: () => void;
}

/**
 * Action interface.
 */
export interface Actions {
  setTheme: (theme?: string | null) => void;
  loadTheme: () => Promise<void>;
  switchTheme: () => Promise<void>;
}

/**
 * Store module.
 */
export const storeModule = {
  state: {
    home: true,
    themes: {},
    lightsOff: false,
    isMobile: false,
    isTablet: false,
    isTouch: false,
    footer: true,
  } as State,
  getters: {
    current: (state: State, getters: any, rootState: any) => {
      if (!rootState.auth.isAuth) {
        return 'auth';
      }
  
      return state.home ? 'home' : 'default';
    },
  } as Getters,
  mutations: {
    home: (state: State, status: boolean) => (state.home = status),
    setThemes: (state: State, themes: Themes.LoadedThemes) => (state.themes = themes),
    toggleLights: (state: State) => (state.lightsOff = !state.lightsOff),
    setIsMobile: (state: State, isMobile: boolean) => (state.isMobile = isMobile),
    setIsTablet: (state: State, isTablet: boolean) => (state.isTablet = isTablet),
    setIsTouch: (state: State, isTouch: boolean) => (state.isTouch = isTouch),
    hideFooter: (state: State) => (state.footer = false),
    showFooter: (state: State) => (state.footer = true),
  } as Mutations,
  actions: {
    setTheme: ({ state, rootGetters }: any, theme: string | null = null) => {
      const themes: Themes.LoadedThemes = state.themes;
      
      if (!theme) {
        theme = themes[rootGetters['preferences/theme']];
        localStorage.setItem('theme', theme);
      }
  
      Object.keys(themes).forEach((themeKey: string) => themes[themeKey].unuse());
  
      try {
        themes[theme].use();
      } catch (e) {
        themes.light.use();
      }
    },
    loadTheme: async ({ dispatch }: any) => {
      const theme = localStorage.getItem('theme') || 'light';
  
      if (theme) {
        await dispatch('setTheme', theme);
      }
    },
    switchTheme: async ({ commit, dispatch }: any) => {
      commit('toggleLights');
  
      await new Promise(resolve => setTimeout(resolve, 150));
      await dispatch('setTheme');
      commit('toggleLights');
    },
  } as Actions,
};

// Type imports
export type StoreModule = typeof storeModule;
export type StoreState = State;
export type StoreGetters = Getters;
export type StoreMutations = Mutations;
export type StoreActions = Actions;
export type StoreModules = Modules.SyncedModules;
export type StoreThemes = Themes.LoadedThemes;
export type StoreTheme = keyof StoreThemes;
export type StoreModuleHome = Modules.HomeModule;
export type StoreModuleDefault = Modules.DefaultModule;