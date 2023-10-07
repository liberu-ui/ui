```typescript
import store from '../../core/services/store';

/**
 * Translates a given key using the localisation store.
 * @param key - The key to be translated.
 * @param params - Optional parameters to be replaced in the translated string.
 * @returns The translated string or the original key if translation is not available.
 */
export default function translate(key: string, params: Record<string, string> | null = null): string {
  if (key === null || key === '' || typeof key === 'undefined') {
    return null;
  }

  if (!store.getters['localisation/ready']) {
    return key;
  }

  let translation = store.getters['localisation/i18n'](key);

  if (typeof translation === 'undefined' || translation === null) {
    translation = key;

    if (store.state.localisation.keyCollector) {
      store.commit('localisation/addMissingKey', key);
    }
  }

  return !!params && typeof params === 'object'
    ? translation.replace(/:(\w*)/g, (match: string, paramKey: string) => {
      if (typeof params[paramKey.toLowerCase()] === 'undefined') {
        return paramKey;
      }

      const param = params[paramKey.toLowerCase()];

      if (paramKey === paramKey.toUpperCase()) {
        return param.toUpperCase();
      }

      return paramKey[0] === paramKey[0].toUpperCase()
        ? param.charAt(0).toUpperCase() + param.slice(1)
        : param;
    })
    : translation || key;
}
```