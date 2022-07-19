import { combineReducers } from 'redux';
import * as Types from './types';
import { SagaGenericRequestT } from '../types';

const initial: Types.StateT = {
  socket: null,
  sendingMessage: null,
  lastMessage: null
};

const sendingMessageReducer = (lastMessage = initial.sendingMessage, action: SagaGenericRequestT) => {
  switch (action.type) {
    case Types.ActionType.storeSendingMessage: {
      return action.payload;
    }
    default:
      return lastMessage;
  }
};

const lastMessageReducer = (lastMessage = initial.lastMessage, action: SagaGenericRequestT) => {
  switch (action.type) {
    case Types.ActionType.storeLastMessage: {
      return action.payload;
    }
    default:
      return lastMessage;
  }
};

const socketReducer = (socket = initial.socket, action: SagaGenericRequestT) => {
  switch (action.type) {
    case Types.ActionType.storeSocket: {
      return action.payload;
    }
    default:
      return socket;
  }
};

const reducer = combineReducers({
  socket: socketReducer,
  sendingMessage: sendingMessageReducer,
  lastMessage: lastMessageReducer,
});

export default reducer;
