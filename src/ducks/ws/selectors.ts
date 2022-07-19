import { TopState } from '../types';

const sendingMessage = ({ ws }: TopState) => {
    return ws.sendingMessage;
};

const lastMessage = ({ ws }: TopState) => {
    return ws.lastMessage;
};

const socket = ({ ws }: TopState) => {
    return ws.socket;
};

export default {
    socket,
    sendingMessage,
    lastMessage,
};
