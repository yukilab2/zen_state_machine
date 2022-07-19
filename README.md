State machine template (not a package) for apps with react and redux-saga.


# Feature
- Low complexity. Almost no learning required if you already know redux-saga and React hooks.
- Hierarchical state can be defined
- Hierarchical state transition fires onExit and onEnter of each exiting/entering states.
- you may just copy ducks/story part into your app.

# Usage

Customize following files for your app.

## State Names
- ducks/story/types.ts:: ST

## States hierarchy
- ducks/story/reducer.ts:: initial.rootSubStates

## State onEnter, onExit behavior
- ducks/story/saga.ts:: sagaOnEntry()
- ducks/story/saga.ts:: sagaOnExit()

## Key event handler
- ducks/story/saga.ts:: sagaHandleKey()
base key event handler is added in view layer (pages/index.tsx)

## WebSocket handler
Experimental.  At this point, it is implemented in pages/index.tsx. Be careful websocket interface is not thread safe. If you handle web socket in saga layer, web socket communication may suddenly canceled by redux-saga nature and cause communication eror.
redux-saga channel may be utilized but still require careful integration.

## Initialization of state machine
We initialize it from view layer (pages/index.tsx). Search for `sagaStartStateMachine`.
Once initialized
- state may be changed to one of child state if written so in parent state onEnter handler.
- state may change by calling sagaMoveState action.  This action can be called such from button onclick handler, web socket receive handler, timeout handler .. onEnter handlers.
- State transition destination with sagaMoveState are : one of sibling states or one of ascendants.

# TODOs
- test code
- better websocket integration
- timer sample
