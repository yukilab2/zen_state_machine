import { Task } from 'redux-saga';
import { select, put, takeLatest, call, takeEvery, takeLeading,
    spawn, take, cancel, cancelled, delay, putResolve } from 'redux-saga/effects';
import * as story from './index';
import * as ws from '../ws';
import { ST } from './types';
import { eventChannel, END, EventChannel } from 'redux-saga'
import { isEmptyObject } from 'jquery';
import { SagaGenericRequestT } from '../types';
import {initial} from "./reducers";

const TRANSITION_DEBUG = (message: string) => {
    // console.debug(`${message} ${(new Date()).toString()}`);
    console.debug(message);
}

function populate(
    ascendantIds0: Array<ST>,
    siblingIds0: Array<ST>,
    subStates0: story.types.SubStatesT
): story.types.PathsT {
    let ret: story.types.PathsT = {};
    // FIXME can we use ST instead of string?
    Object.keys(subStates0).forEach((myId: string) => {
        ret[myId] = {
            ascendantIds: ascendantIds0,
            siblingIds: siblingIds0,
        };
        if (subStates0[myId].subStates) {
            // FIXME: naturally type this
            const ascendantIds1: ST[] = [...ascendantIds0, myId] as ST[];
            // FIXME: naturally type this
            const siblingIds1 = Object.keys(subStates0[myId].subStates as story.types.SubStatesT) as ST[];
            const paths = populate(
                ascendantIds1,
                siblingIds1,
                subStates0[myId].subStates as story.types.SubStatesT
            );
            // FIXME: naturally type this
            Object.keys(paths).forEach((childId: string /*story.types.StateIdT*/) => {
                ret[childId] = {
                    ascendantIds: paths[childId].ascendantIds,
                    siblingIds: paths[childId].siblingIds,
                };
            })
        }
    });
    return ret;
}

export function* sagaStartStateMachine() {
    const rootSubStates: story.types.SubStateT = yield select(story.selectors.rootSubStates);
    const root_states: ST[] = Object.keys(initial.rootSubStates) as ST[];
    const x = populate([], root_states, rootSubStates);

    // sagaMoveState requires statePaths information
    yield put(story.actions.storeStatePaths(x));
    // on connection to backend web socket, it moves on to ST_GUIDE
}

/**
 * 遷移は、直下の子状態の一つか、他の兄弟状態、または親(親自身をのぞく）の兄弟状態)へ可能。
 * @param action
 * @returns
 */
export function* sagaMoveState(action: story.types.opMoveStateT) {
    const root: story.types.RootT = yield select(story.selectors.root);
    const statePaths: story.types.PathsT = yield select(story.selectors.statePaths);
    if (isEmptyObject(statePaths)) {
        console.error("sagaStateInitialize not executed");
        return;
    }
    const newState = action.payload;
     TRANSITION_DEBUG(`##transition ${root.current} => ${newState}`);

    let focalState: story.types.ST = root.current;
    let ascendantIds = [...statePaths[focalState].ascendantIds];    // ascendantIds will be changed by pop so copyings information
    // depthLimit may need to define referring statePaths but 10 should work.
    let depthLimit = 10;
    if (!statePaths[newState]) {
        console.debug(`###ERROR statePaths for newState ${newState}`, statePaths);
    }
    if (!statePaths[newState].ascendantIds.includes(focalState)) {
        do {
            if (typeof focalState === 'undefined'){
                console.error(`Illegal or not allowed transition operation. You can move state on to ${root.current}'s one of sibling or ascendants' sibling state`);
                return;
            }
            TRANSITION_DEBUG(`..##onExit @ ${focalState}`);
            yield put(story.actions.sagaOnExit(focalState));
            if (statePaths[focalState].siblingIds.includes(newState)) {
                break;
            }
            // TRANSITION_DEBUG(`focalState ${focalState} ascendantIds ${ascendantIds}`)
            focalState = ascendantIds.pop() as ST;  // parent state of current focalState
            depthLimit--;
            if (depthLimit <= 0) {
                console.error(`##program error. max recursive parent state search when moving ${root.current} onto ${newState}`);
            }
        } while (true);
    }
    yield put(story.actions.storeUpdateState({ current: newState, previous: root.current }));
    // 遷移先onEntry()
    TRANSITION_DEBUG(`..##onEntry @ ${newState}`);
    yield put(story.actions.sagaOnEntry());    // onEntry() of the new state
    // yield spawn(module.exports["onEntry" + newState]);    // onEntry() of the new state
}

export function* sagaHandleKey(action: story.types.sagaHandleKeyT) {
    const root: story.types.RootT = yield select(story.selectors.root);
    const key = action.payload;
    switch (root.current) {
        // case sts.ST_STATE0: {
        //     if (key === 'ArrowRight') {
        //         yield put(story.actions.sagaMoveState(sts.ST_STATE1));
        //     }
        //     break;
        // }
        // case sts.ST_STATE0: {
        //     if (key === '1') {
        //         yield put(story.actions.sagaMoveState(sts.ST_STATE1));
        //     }
        //     break;
        // }
        default:
            console.log(`##key ignored at ${root.current}`);
    }
}

function* processTimeout(ms: number, stateName: ST, waitingReason: string) {
    // let remain_sec = Math.floor(ms / 1000);
    // const timeoutCalc = () => {
    //     return eventChannel(emitter => {
    //         const iv = setTimeout(() => {
    //             emitter(END)
    //         }, ms);
    //         const it = setInterval(() => {
    //             remain_sec --;
    //             if (remain_sec < 0){
    //                 remain_sec = 0;
    //             }
    //             emitter(remain_sec);
    //         }, 1000);
    //         // The subscriber must return an unsubscribe function
    //         return () => {
    //             clearInterval(it);
    //             clearTimeout(iv);
    //         }
    //     })
    // };
    // const chan: EventChannel<NodeJS.Timeout> = yield call(timeoutCalc);
    //
    // yield put(story.actions.storeProgress(remain_sec.toString()));
    // try {
    //     while (true) {
    //         // take(END) will cause the saga to terminate by jumping to the finally block
    //         const progress: number = yield take(chan);
    //         yield put(story.actions.storeProgress(remain_sec.toString()));
    //     }
    // } finally {
    //     yield put(story.actions.storeProgress('' ));
    // }
}

export function* sagaOnEntry() {
    const root: story.types.RootT = yield select(story.selectors.root);
    switch (root.current) {
        case ST.STATE2: {
            yield delay(1000);
            yield put(story.actions.sagaMoveState(ST.STATE2_0));
            break;
        }
        case ST.STATE2_0: {
            yield delay(1000);
            yield put(story.actions.sagaMoveState(ST.STATE2_0_0));
            break;
        }
        case ST.STATE2_0_0: {
            yield delay(1000);
            yield put(story.actions.sagaMoveState(ST.STATE2_0_1));
            break;
        }
        case ST.STATE2_0_1: {
            yield delay(1000);
            yield put(story.actions.sagaMoveState(ST.STATE2_0_2));
            break;
        }
        case ST.STATE2_0_2: {
            yield delay(1000);
            yield put(story.actions.sagaMoveState(ST.STATE2_1));
            break;
        }
        default:
    }
}

export function* sagaOnExit(action: SagaGenericRequestT) {
    const fromState: ST = action.payload;
    switch (fromState) {
        default:
    }
}

export function* checkState(action: SagaGenericRequestT) {
    if (action.type === story.types.ActionType.sagaMoveState) {
        const statePaths: story.types.PathsT = yield select(story.selectors.statePaths);
        const state: ST = action.payload;
        if (!Object.keys(statePaths).includes(state)) {
            console.error(`##invalid state: ${state}`);
        }
    }
}

export default function* watcher() {
    yield takeLeading(story.types.ActionType.sagaStartStateMachine, sagaStartStateMachine);
    yield takeEvery(story.types.ActionType.sagaMoveState, sagaMoveState);
    yield takeEvery(story.types.ActionType.sagaHandleKey, sagaHandleKey);
    yield takeEvery(story.types.ActionType.sagaOnEntry, sagaOnEntry);
    yield takeEvery(story.types.ActionType.sagaOnExit, sagaOnExit);
    yield takeEvery('*', checkState);
}
