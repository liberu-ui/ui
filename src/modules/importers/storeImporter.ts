/**
 * Creates a store importer using the given require context.
 * The store importer maps the file names to their corresponding modules and sets them as namespaced modules.
 * @param requireContext - The requireContext function used to import the modules.
 * @returns The store importer function.
 */
const createStoreImporter = (requireContext: __WebpackModuleApi.RequireContext): Record<string, any> => {
  const storeModules = requireContext.keys()
    .map((fileName: string) => [
      fileName.replace(/(^.\/)|(\.ts$)/g, ''),
      requireContext(fileName),
    ])
    .reduce((modules: Record<string, any>, [name, module]: [string, any]) => {
      module.namespaced = true;
      return Object.assign({}, modules, { [name]: module });
    }, {});

  return storeModules;
};

export default createStoreImporter;
