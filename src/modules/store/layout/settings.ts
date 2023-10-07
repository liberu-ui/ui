```
/**
 * The state object representing the current state of the application.
 * @property {boolean} isVisible - Indicates whether a component is visible or hidden.
 */
export const state: { isVisible: boolean } = {
    isVisible: false,
};

/**
 * The mutations object containing functions to update the state object.
 */
export const mutations = {
    /**
     * Toggles the visibility state of a component.
     * @param {object} state - The current state object.
     */
    toggle: (state: { isVisible: boolean }): void => {
        state.isVisible = !state.isVisible;
    },
};
```