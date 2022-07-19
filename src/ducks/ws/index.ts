import reducer from './reducers';
import selectors from './selectors';
import watcher from './saga';
import * as actions from './actions';
import * as types from './types';

export { selectors, actions, watcher, types };

export default reducer;
