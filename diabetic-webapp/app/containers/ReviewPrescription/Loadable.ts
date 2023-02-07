/**
 *  Asynchronoulsy load the component from Preview Prescription Screen
 */

import loadable from '../../utils/loadable';
export default loadable(() => import('./index'));
