import { put, select, takeEvery, delay } from 'redux-saga/effects';
import * as ws from './index';
import { SagaGenericRequestT } from '../types';

/**
 * send a message. This saga waits while previsous websocket data is being processed
 * @param action
 */
export function* sagaSend(action: SagaGenericRequestT) {
    const sendingMessage: any = action.payload;
    const sock: WebSocket = yield select(ws.selectors.socket);
    do {
        // console.debug('###sagaSend', sendingMessage, sock.bufferedAmount);
        if(sendingMessage || (sock && sock.bufferedAmount > 0)) {
            yield put(ws.actions.storeSendingMessage(action.payload));
            break;
        }
        yield delay(200);
    } while (1)
}

export default function* watcher() {
    yield takeEvery(ws.types.ActionType.sagaSend, sagaSend);
}
