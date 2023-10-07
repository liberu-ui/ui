/**
 * Function that generates a URL based on the given parameters
 * @param {string} name - The name of the route
 * @param {Object} params - The parameters for the route
 * @param {boolean} absolute - Indicates whether the URL should be absolute or relative
 * @returns {string} - The generated URL
 */
import RouteMapper from '@liberu-ui/route-mapper';
import store from '../../core/services/store';

export default function generateUrl(name: string, params: object, absolute: boolean): string {
    const { meta, routes } = store.state;

    return (new RouteMapper(meta.appUrl, routes).get(name, params, absolute));
}