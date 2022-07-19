import { all } from 'redux-saga/effects';

import { watcher as storyWatcher } from './story';
import { watcher as wsWatcher } from './ws';

export default function* rootSaga() {
  yield all([
    storyWatcher(),
    wsWatcher(),
  ]);
}
