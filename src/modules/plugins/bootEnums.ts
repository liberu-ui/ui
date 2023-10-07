/**
 * A function that initializes and bootstraps enums with internationalization support.
 * @param enums - An object containing the enum values.
 * @param i18n - The internationalization object.
 * @returns An object containing initialized enum instances.
 */
const bootEnums = (enums: Record<string, any>, i18n: any): Record<string, any> => {
    const initializedEnums = {};

    Object.keys(enums).forEach(enumName => {
        initializedEnums[enumName] = new Enum(enums[enumName], i18n);
    });

    return initializedEnums;
};

export default bootEnums;
```