/***
 * This function converts a theme importing code from JavaScript to TypeScript.
 * 
 * @param requireContext - A function that imports the themes.
 * 
 * @returns - An object containing the imported themes with their respective names as keys.
 */
const themeImporter = (requireContext: any): {[key: string]: any} => {
    return requireContext.keys()
        .map((fileName: string) => {
            const name = fileName.replace(/(^.\/)|(\.lazy.scss$)/g, '');
            const theme = requireContext(fileName);
            return [name, theme];
        })
        .reduce((themes: {[key: string]: any}, [name, theme]: [string, any]) => {
            return {...themes, [name]: theme.default};
        }, {});
};

export default themeImporter;