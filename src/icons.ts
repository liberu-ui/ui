/**
 * This file imports and adds FontAwesome icons to the library.
 */

import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCogs, faSlidersH } from '@fortawesome/free-solid-svg-icons';

/**
 * Adds FontAwesome icons to the library.
 *
 * @param icons - The FontAwesome icons to be added to the library.
 * @returns void
 */
function addFontAwesomeIcons(icons: IconDefinition[]): void {
  library.add(...icons);
}

// Initialize an array of FontAwesome icons
const iconsToAdd: IconDefinition[] = [faCogs, faSlidersH];

// Add FontAwesome icons to the library
addFontAwesomeIcons(iconsToAdd);
