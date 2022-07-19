import { combineReducers } from 'redux';

import story, { types as StoryTypes } from './story';
import ws, { types as WsTypes } from './ws';

export type RootState = {
  story: StoryTypes.StateT;
  ws: WsTypes.StateT;
};

const rootReducer = combineReducers({
  story,
  ws,
});

export default rootReducer;
