```typescript
/**
 * Represents the application state.
 */
export interface State {
  /**
   * Indicates whether the component is expanded.
   */
  isExpanded: boolean;
  /**
   * Indicates whether the component is visible.
   */
  isVisible: boolean;
}

/**
 * Represents the mutations that can be applied to the application state.
 */
export interface Mutations {
  /**
   * Shows the component.
   * @param state - The application state.
   */
  show(state: State): void;
  
  /**
   * Hides the component.
   * @param state - The application state.
   */
  hide(state: State): void;
  
  /**
   * Expands the component.
   * @param state - The application state.
   */
  expand(state: State): void;
  
  /**
   * Collapses the component.
   * @param state - The application state.
   */
  collapse(state: State): void;
  
  /**
   * Updates the expansion status of the component.
   * @param state - The application state.
   * @param status - The new expansion status.
   */
  update(state: State, status: boolean): void;
  
  /**
   * Toggles the visibility and expansion status of the component.
   * @param state - The application state.
   * @param isTouch - Indicates whether the device supports touch input.
   */
  toggle(state: State, isTouch: boolean): void;
}

/**
 * The application state.
 */
export const state: State = {
  isExpanded: true,
  isVisible: true,
};

/**
 * The mutations that can be applied to the application state.
 */
export const mutations: Mutations = {
  show: state => (state.isVisible = true),
  hide: state => (state.isVisible = false),
  expand: state => (state.isExpanded = true),
  collapse: state => (state.isExpanded = false),
  update: (state, status) => (state.isExpanded = status),
  toggle: (state, isTouch) => {
    if (isTouch) {
      state.isExpanded = true;
      state.isVisible = !state.isVisible;
      return;
    }
    
    state.isVisible = true;
    state.isExpanded = !state.isExpanded;
  },
};
```
```