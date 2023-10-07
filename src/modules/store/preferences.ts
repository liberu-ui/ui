/**
 * Imports
 */
import axios, { AxiosResponse } from 'axios';
import route from '../plugins/route';

/**
 * State
 */
export interface RootState {
  global: GlobalPreferences;
  local: LocalPreferences;
}

export interface GlobalPreferences {
  lang: string;
  theme: string;
  expandedSidebar: boolean;
  toastrPosition: string;
  bookmarks: string[];
}

export interface LocalPreferences {
  [key: string]: any;
}

/**
 * Helper function to send PATCH request to update preferences
 * @param payload - The data payload for the request
 * @returns Promise<AxiosResponse>
 */
const updatePreferences = (payload: any): Promise<AxiosResponse> => axios.patch(route('core.preferences.store'), payload);

/**
 * Getters
 */
export const getters = {
  /**
   * Get the global preferences
   * @param state - The root state object
   * @returns The global preferences object
   */
  global: (state: RootState): GlobalPreferences => state.global,

  /**
   * Get the local preferences for a specific route
   * @param state - The root state object
   * @returns { function(route: string): any }
   */
  local: (state: RootState) =>
    (route: string): any => state.local[route],

  /**
   * Get the language from global preferences
   * @param state - The root state object
   * @returns The language value
   */
  lang: (state: RootState): string => state.global.lang,

  /**
   * Get the theme from global preferences
   * @param state - The root state object
   * @returns The theme value
   */
  theme: (state: RootState): string => state.global.theme,

  /**
   * Get the expandedSidebar value from global preferences
   * @param state - The root state object
   * @returns The expandedSidebar value
   */
  expandedSidebar: (state: RootState): boolean => state.global.expandedSidebar,

  /**
   * Get the toastrPosition value from global preferences
   * @param state - The root state object
   * @returns The toastrPosition value
   */
  toastrPosition: (state: RootState): string => state.global.toastrPosition,

  /**
   * Get the bookmarks array from global preferences
   * @param state - The root state object
   * @returns The bookmarks array
   */
  bookmarks: (state: RootState): string[] => state.global.bookmarks,
};

/**
 * Mutations
 */
export const mutations = {
  /**
   * Set the preferences state
   * @param state - The root state object
   * @param preferences - The preferences object
   */
  set: (state: RootState, preferences: RootState): void => {
    state.global = preferences.global;
    state.local = preferences.local;
  },

  /**
   * Set a specific property in the global preferences object
   * @param state - The root state object
   * @param payload - An object containing the key and value to update in global preferences
   */
  setGlobal: (state: RootState, payload: { key: string; value: any }): void =>
    (state.global[payload.key] = payload.value),

  /**
   * Set the language in global preferences
   * @param state - The root state object
   * @param lang - The language value
   */
  setLang: (state: RootState, lang: string): void => (state.global.lang = lang),

  /**
   * Set the theme in global preferences
   * @param state - The root state object
   * @param theme - The theme value
   */
  setTheme: (state: RootState, theme: string): void => (state.global.theme = theme),

  /**
   * Set the toastrPosition in global preferences
   * @param state - The root state object
   * @param position - The toastrPosition value
   */
  setToastrPosition: (state: RootState, position: string): void =>
    (state.global.toastrPosition = position),

  /**
   * Set the expandedSidebar value in global preferences
   * @param state - The root state object
   * @param expandedSidebar - The expandedSidebar value
   */
  setExpandedSidebar: (state: RootState, expandedSidebar: boolean): void =>
    (state.global.expandedSidebar = expandedSidebar),

  /**
   * Set the bookmarks array in global preferences
   * @param state - The root state object
   * @param bookmarks - The bookmarks array
   */
  setBookmarks: (state: RootState, bookmarks: string[]): void =>
    (state.global.bookmarks = bookmarks),

  /**
   * Set a specific property in the local preferences object
   * @param state - The root state object
   * @param value - The value to set for the current route
   */
  setLocal: (state: RootState, value: any): void =>
    (state.local[state.route.name] = value),
};

/**
 * Actions
 */
export const actions = {
  /**
   * Set the global preferences
   * @param context - The context object
   * @param payload - The payload object with the preferences to set
   */
  setGlobalPreferences: async (
    { commit }: any,
    payload: GlobalPreferences
  ): Promise<void> => {
    commit('setGlobal', payload);
    await updatePreferences({ global: payload });
  },

  /**
   * Set the local preferences for the current route
   * @param context - The context object
   * @param value - The value to set for the current route
   */
  setLocalPreferences: async (
    { commit, state }: any,
    value: any
  ): Promise<void> => {
    commit('setLocal', value);
    await updatePreferences({ route: state.route.name, value });
  },

  /**
   * Set the language in global preferences
   * @param context - The context object
   * @param lang - The language value
   */
  setLanguage: async (
    {
      commit,
      dispatch,
      getters,
      rootGetters,
    }: any,
    lang: string
  ): Promise<void> => {
    const isRtl = rootGetters['localisation/rtl'];
    commit('setLang', lang);
    localStorage.setItem('locale', lang);

    if (rootGetters['localisation/isRtl'](lang) !== isRtl) {
      await dispatch('setTheme', getters.theme);
    }

    await updatePreferences({ global: getters.global });
  },

  /**
   * Set the theme in global preferences
   * @param context - The context object
   * @param theme - The theme value
   */
  setTheme: async (
    { commit, dispatch, rootGetters }: any,
    theme: string
  ): Promise<void> => {
    const isRtl = rootGetters['localisation/rtl'];
    const nextTheme = theme.replace('-rtl', '') + (isRtl ? '-rtl' : '');
    commit('setTheme', nextTheme);

    await dispatch('layout/switchTheme', null, { root: true }).then(() =>
      updatePreferences({ global: getters.global })
    );
  },

  /**
   * Set the toastrPosition in global preferences
   * @param context - The context object
   * @param position - The toastrPosition value
   */
  setToastrPosition: async (
    { commit }: any,
    position: string
  ): Promise<void> => {
    commit('setToastrPosition', position);
    await updatePreferences({ global: getters.global });
  },

  /**
   * Set the bookmarks array in global preferences
   * @param context - The context object
   * @param bookmarks - The bookmarks array
   */
  setBookmarks: async ({ commit }: any, bookmarks: string[]): Promise<void> => {
    commit('setBookmarks', bookmarks);
    await updatePreferences({ global: getters.global });
  },

  /**
   * Set the expandedSidebar value in global preferences
   * @param context - The context object
   * @param state - The expandedSidebar value
   */
  setSidebarState: async (
    { commit }: any,
    expandedSidebar: boolean
  ): Promise<void> => {
    commit('setExpandedSidebar', expandedSidebar);
    commit('layout/sidebar/update', expandedSidebar, { root: true });
    await updatePreferences({ global: getters.global });
  },
};
**/