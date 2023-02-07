/**
 * Asynchronously loads the component for Splash screen
 */

import loadable from 'utils/loadable';
export default loadable(() => import('./index'));

