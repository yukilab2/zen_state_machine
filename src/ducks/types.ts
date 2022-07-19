import { types as StoryTypes } from './story';
import { types as WsTypes } from './ws';

export type TopState = {
  story: StoryTypes.StateT;
  ws: WsTypes.StateT;
};

export type SagaGenericRequestT = {
  type: any;
  payload?: any;
};
