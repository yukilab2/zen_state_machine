import * as Types from './types';

export const sagaSend = (payload: {
    op: string,
    [key: string]: any,
}) => { 
    return {payload, type: Types.ActionType.sagaSend };
};

export const storeSocket = (payload: WebSocket | null) => ({payload, type: Types.ActionType.storeSocket });
export const storeSendingMessage = (payload: any) => ({payload, type: Types.ActionType.storeSendingMessage });
export const storeLastMessage = (payload: any) => ({payload, type: Types.ActionType.storeLastMessage });
