import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import * as story from '../ducks/story';
// import * as ws from '../ducks/ws';
import { ST } from "../ducks/story/types";

const WS_CONNECTING = 0;
const WS_OPEN = 1;
const WS_CLOSING = 2;
const WS_CLOSED = 3;

// function setMessage(sock: WebSocket, dispatch: Dispatch<any>, message : any){
//     if(sock && sock.bufferedAmount > 0) {
//         // wait until sendingMessage becoming null
//     } else {
//         dispatch(ws.actions.storeSendingMessage(message));
//     }
// }

const Index: React.FC = () => {
    const dispatch = useDispatch();
    // const [sock, setSock] = useState<WebSocket|null>(null);
    // const sendingMessage = useSelector(ws.selectors.sendingMessage);
    const root = useSelector(story.selectors.root);

    // useEffect(() => {
    //     // WebSocket requires layout having been done
    //     setSock(new WebSocket(process.env.SOCKET_URL as string));
    // }, []);

    // useEffect(() => {
    //     if (sock) {
    //         dispatch(ws.actions.storeSocket(sock));
    //         sock.onopen = (event) => {
    //             dispatch(story.actions.sagaMoveState(ST.STATE0));
    //         };
    //         sock.onmessage = (event: MessageEvent<string>) => {
    //             const message: any = JSON.parse(event.data);
    //             dispatch(ws.actions.storeLastMessage(message));
    //         };
    //         sock.onerror = (event) => {
    //             console.error("##websocket error", event);
    //         };
    //         sock.onclose = (event) => {
    //             dispatch(ws.actions.storeSocket(null));
    //         };
    //     }
    //     return () => {
    //             if (sock) {
    //             try {
    //                 sock.onclose = null;
    //                 sock.onopen = null;
    //                 sock.onmessage = null;
    //                 sock.onerror = null;
    //                 sock.close();
    //             } finally {
    //                 dispatch(ws.actions.storeSocket(null));
    //             }
    //         }
    //     }
    // }, [sock, dispatch]);

    useEffect(() => {
        dispatch(story.actions.sagaStartStateMachine());

        const handler = (event: KeyboardEvent) => {
            dispatch(story.actions.sagaHandleKey(event.key));
        }
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [dispatch]);

    // useEffect(() => {
    //     if (sendingMessage && sock && sock.readyState == WS_OPEN) {
    //         sock.send(JSON.stringify(sendingMessage));
    //         dispatch(ws.actions.storeSendingMessage(null));
    //     }
    // }, [dispatch, sock, sendingMessage]);

    const moveOnTo = (to: ST) => dispatch(story.actions.sagaMoveState(to));

    return (<Box>
        <Box>
            current state: {root.current}
        </Box>
        <Box>
        Operations:
            <ul>
                <li><button onClick={() => moveOnTo(ST.STATE0)}>to STATE0</button> </li>
                <li><button onClick={() => moveOnTo(ST.STATE1)}>to STATE1</button> </li>
                <li><button onClick={() => moveOnTo(ST.STATE2)}>to STATE2</button> </li>
                <li><button onClick={() => moveOnTo(ST.STATE3)}>to STATE3</button> </li>
            </ul>
        </Box>
        <Box sx={{padding: 1}}>
            {[
                [0, ST.INITIAL],
                [0, ST.STATE0],
                [0, ST.STATE1],
                [0, ST.STATE2],
                [1, ST.STATE2_0],
                [2, ST.STATE2_0_0],
                [2, ST.STATE2_0_1],
                [2, ST.STATE2_0_2],
                [1, ST.STATE2_1],
                [1, ST.STATE2_2],
                [0, ST.STATE3],
                [1, ST.STATE3_0],
                [2, ST.STATE3_0_0],
                [2, ST.STATE3_0_1],
                [1, ST.STATE3_1],
            ].map((defs, key:number) => {
                switch(defs[0]) {
                    case 1: return <h2 key={key} id={defs[1] as ST}
                        className={root.current === defs[1] ? 'selected' : ''}>{defs[1]}</h2>;
                    case 2: return <h3 key={key} id={defs[1] as ST}
                        className={root.current === defs[1] ? 'selected' : ''}>{defs[1]}</h3>;
                    default: return <h1 key={key} id={defs[1] as ST}
                        className={root.current === defs[1] ? 'selected' : ''}>{defs[1]}</h1>;
                }
            })}
        </Box>
    </Box>);
};

export default Index;
