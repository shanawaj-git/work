/**
 *  Asynchornoulsy loads the component for Summary Screen
 */

import loadable from '../../utils/loadable';
export default loadable(() => import('./index'));
