/**
 * Imports routes from multiple files using require context.
 * @param requireContext - The require context function.
 * @returns An array of routes.
 */
const routeImporter = (requireContext: any): any[] => {
  return requireContext.keys()
    .map((fileName: string) => requireContext(fileName))
    .reduce((routes: any[], route: any) => {
      if (Array.isArray(route.default)) {
        return [...routes, ...route.default];
      } else {
        return [...routes, route.default];
      }
    }, []);
};

export default routeImporter;