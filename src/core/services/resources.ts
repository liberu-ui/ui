/*-----------------------------------------------------------------------
 * File: resources.ts
 * Description: Implementation of the Resources class.
 ------------------------------------------------------------------------*/

/* Import the 'contexts' module */
import contexts from './contexts';

/**
 * Class representing a Resources object.
 */
class Resources {
    private profile: string;
    private contexts: any;

    /**
     * Create a Resources object.
     */
    constructor() {
        this.profile = process.env.VUE_APP_PROFILE;
        this.contexts = contexts;
    }

    /**
     * Boots up the Resources object by requiring necessary contexts.
     * @return {Resources} - The updated Resources object.
     */
    public boot(): Resources {
        this.requireContext(this.register())
            .requireContext(this.icons());
        return this;
    }

    /**
     * Get the core routes based on the current profile.
     * @return {object} - The core routes object.
     */
    public coreRoutes(): object {
        return this.contexts[this.profile].coreRoutes;
    }

    /**
     * Get the icons based on the current profile.
     * @return {object} - The icons object.
     */
    public icons(): object {
        return this.contexts[this.profile].icons;
    }

    /**
     * Get the register based on the current profile.
     * @return {object} - The register object.
     */
    public register(): object {
        return this.contexts[this.profile].register;
    }

    /**
     * Get the routes based on the current profile.
     * @return {object} - The routes object.
     */
    public routes(): object {
        return this.contexts[this.profile].routes;
    }

    /**
     * Get the local routes.
     * @return {object} - The local routes object.
     */
    public localRoutes(): object {
        return this.contexts.local.routes;
    }

    /**
     * Get the common store.
     * @return {object} - The common store object.
     */
    public store(): object {
        return this.contexts.common.store;
    }

    /**
     * Get the local store.
     * @return {object} - The local store object.
     */
    public localStore(): object {
        return this.contexts.local.store;
    }

    /**
     * Requires a context by iterating over the files using requireContext.
     * @param {function} requireContext - The requireContext function.
     * @return {Resources} - The updated Resources object.
     */
    private requireContext(requireContext: any): Resources {
        requireContext.keys().forEach((file: any) => requireContext(file));
        return this;
    }
};

export default new Resources();