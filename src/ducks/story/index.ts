import reducer from './reducers';
import watcher from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import * as types from './types';

export { selectors, actions, watcher, types };
// export const appName = 'story';
export default reducer;
