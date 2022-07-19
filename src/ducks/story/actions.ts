import * as types from './types';
import { SagaGenericRequestT } from '../types';

export const sagaStartStateMachine = () => ({type: types.ActionType.sagaStartStateMachine});

export const sagaMoveState = (payload: types.ST) =>
    ({payload, type: types.ActionType.sagaMoveState});

export const sagaHandleKey = (key: string) =>
    ({payload: key, type: types.ActionType.sagaHandleKey} as types.sagaHandleKeyT);

export const sagaOnEntry: () => SagaGenericRequestT
    = () => ({type: types.ActionType.sagaOnEntry});

export const sagaOnExit: (payload: types.ST) => SagaGenericRequestT
    = (payload) => ({payload, type: types.ActionType.sagaOnExit});

export const storeUpdateState = (payload: Partial<types.RootT>) =>
    ({payload, type: types.ActionType.storeUpdateState});

export const storeStatePaths = (payload: types.PathsT) =>
    ({payload, type: types.ActionType.storeStatePaths});

export const storeProgress = (payload: string) =>
    ({payload, type: types.ActionType.storeProgress});
