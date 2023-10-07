/**
 * This file contains the TypeScript code for managing the visibility state.
 */

/**
 * Represents the state object.
 */
export interface State {
  /**
   * Indicates whether the element is visible or not.
   */
  isVisible: boolean;
}

/**
 * Represents the mutation functions for modifying the state.
 */
export interface Mutations {
  /**
   * Sets the "isVisible" flag to true.
   * @param state - The state object.
   */
  show: (state: State) => void;

  /**
   * Sets the "isVisible" flag to false.
   * @param state - The state object.
   */
  hide: (state: State) => void;
}

/**
 * The initial state.
 */
export const state: State = {
  isVisible: false,
};

/**
 * The mutation functions for modifying the state.
 */
export const mutations: Mutations = {
  /**
   * Sets the "isVisible" flag to true.
   * @param state - The state object.
   */
  show: (state: State): void => {
    state.isVisible = true;
  },

  /**
   * Sets the "isVisible" flag to false.
   * @param state - The state object.
   */
  hide: (state: State): void => {
    state.isVisible = false;
  },
};