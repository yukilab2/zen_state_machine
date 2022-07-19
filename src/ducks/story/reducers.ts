import { combineReducers } from 'redux';
import { SagaGenericRequestT } from '../types';
import * as types from './types';
import { ST } from './types';
import objectAssignDeep from 'object-assign-deep';

export const initial: types.StateT = {
  root: {
    current: ST.INITIAL,
    previous: ST.INITIAL,
  },
  rootSubStates: {
    [ST.INITIAL]: {},
    [ST.STATE0]: {
    },
    [ST.STATE1]: {
    },
    [ST.STATE2]: {
      subStates: {
        [ST.STATE2_0]: {
          subStates: {
            [ST.STATE2_0_0]: {},
            [ST.STATE2_0_1]: {},
            [ST.STATE2_0_2]: {},
          },
        },
        [ST.STATE2_1]: {},
        [ST.STATE2_2]: {},
      },
    },
    [ST.STATE3]: {
      subStates: {
        [ST.STATE3_0]: {
          subStates: {
            [ST.STATE3_0_0]: {},
            [ST.STATE3_0_1]: {},
          },
        },
        [ST.STATE3_1]: {}
      },
    },
  },
  statePaths: {},

  progress: '',
  myStateVariable: 0
};

const rootReducer = (root = initial.root, action: SagaGenericRequestT) => {
  switch (action.type) {
    case types.ActionType.storeUpdateState: {
      // nop if transition to same state
      const temp = action.payload as Partial<types.RootT>;
      return objectAssignDeep({}, root, temp);
    }
    default:
      return root;
  }
};

const rootSubStatesReducer = (rootSubStates = initial.rootSubStates, action: SagaGenericRequestT) => {
  switch (action.type) {
    default:
      return rootSubStates;
  }
};

const statePathsReducer = (sp = initial.statePaths, action: SagaGenericRequestT) => {
  switch (action.type) {
    case types.ActionType.storeStatePaths: {
      return objectAssignDeep({}, sp, action.payload);
    }
    default:
      return sp;
  }
};

const progressReducer = (progress = initial.progress, action: SagaGenericRequestT) => {
  switch (action.type) {
    case types.ActionType.storeProgress: {
      return { progress: action.payload};
    }
    default:
      return progress;
  }
};

const reducer = combineReducers({
  root: rootReducer,
  statePaths: statePathsReducer,
  progress : progressReducer,
  rootSubStates: rootSubStatesReducer,
});

export default reducer;
