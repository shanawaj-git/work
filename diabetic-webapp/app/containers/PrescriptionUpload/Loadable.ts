/**
 * Asynchronously load the component from Upload Prescription Screen
 */
import loadable from 'utils/loadable';
export default loadable(() => import('./index'));
