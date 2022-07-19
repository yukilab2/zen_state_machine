export enum ActionType {
    sagaSend = 'ws/sagaSend',

    storeSendingMessage = 'ws/storeSendingMessage',
    storeLastMessage = 'ws/storeLastMessage',
    storeSocket = 'ws/storeSocket',
}

export type StateT = {
    socket: WebSocket | null;
    sendingMessage: any | null;
    lastMessage: any | null;
};
