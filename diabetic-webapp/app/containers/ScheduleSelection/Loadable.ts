/**
 * Asynchronously load the component from Schedule Selection Screen
 */

import loadable from '../../utils/loadable';
export default loadable(() => import('./index'));
