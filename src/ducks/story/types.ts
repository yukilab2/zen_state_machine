export enum ActionType {
    sagaStartStateMachine = 'story/sagaStartStateMachine',
    sagaMoveState = 'story/sagaMoveState',
    sagaHandleKey = 'story/sagaHandleKey',

    sagaOnEntry = 'story/sagaOnEntry',
    sagaOnExit = 'story/sagaOnExit',
    storeUpdateState = 'story/storeUpdateState',
    storeStatePaths = 'story/storeStatePaths',
    storeProgress = 'story/storeProgress'
}

export enum ST {
// export type sts = {
    INITIAL= "INITIAL",
    STATE0 = "STATE0",
    STATE1 = "STATE1",
    STATE2 = "STATE2",
    STATE2_0 = "STATE2_0",
    STATE2_0_0 = "STATE2_0_0",
    STATE2_0_1 = "STATE2_0_1",
    STATE2_0_2 = "STATE2_0_2",
    STATE2_1 = "STATE2_1",
    STATE2_2 = "STATE2_2",
    STATE3 = "STATE3",
    STATE3_0 = "STATE3_0",
    STATE3_0_0 = "STATE3_0_0",
    STATE3_0_1 = "STATE3_0_1",
    STATE3_1 = "STATE3_1"
}

// parallel state is not supported. To support. each SubT shall hold current/previous state variable.
// For now, current/previous can hold any root, and descendant state names
export type RootT = {
    current: ST;
    previous: ST;
};

export type SubStateT = {
    subStates?: SubStatesT;
};

// FIXME can we specify key as type sts?
export type SubStatesT = { [key: string]: SubStateT; };

export type PathT = {
    ascendantIds: Array<ST>,  // list of state IDs to my State. (my state ID not included)
    siblingIds: Array<ST>     // list of siblingIds (my state Id included)
}

export type PathsT = {[str: string]: PathT};

export type KvT = {[key:string]: any};

export type StateT = {
    root: RootT;
    // FIXME to type
    rootSubStates: { [key: string]: SubStateT; };
    statePaths: PathsT;

    // any user defined variables here
    progress: string;
    myStateVariable: number;
};

export type storeUpdateSubT = {
    type: ActionType;
    payload: Partial<SubStateT>;
};

export type opMoveStateT = {
    type: ActionType;
    payload: ST;
};

export type sagaHandleKeyT = {
    type: ActionType;
    payload: string;
};
