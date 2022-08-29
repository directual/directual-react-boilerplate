import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from "../auth";

const socket = io('', { autoConnect: false })

//or you could connect without proxy
//const socket = io('https://api.directual.com/', {autoConnect: false})

export default function Websocket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState(null);
    const [allMessages, setAllMessages] = useState(null)
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAutorised()) {
            fetch("/appid").then((response) => {
                response.json().then(data => {
                    socket.auth = { app_id: data.APP_ID, session_id: auth.sessionID };
                    socket.connect();
                })
            })
        }

        //subscribe to any events
        socket.onAny((eventName, args) => {
            //setMessage(`${eventName}: ${JSON.stringify(args)}`);
            setMessage(<div>{`${eventName}: ${JSON.stringify(args)}`} &nbsp;<code>{(new Date()).toISOString()}</code></div>);
        });

        //subscribe to only 'message' events
        socket.on('message', (msg) => {
            setMessage(<div>{msg} &nbsp;<code>{(new Date()).toISOString()}</code></div>);
        })

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    useEffect(() => {
        setAllMessages(<React.Fragment>{message}{allMessages}</React.Fragment>)
    }, [message])

    return (
        <div className="content">
            <h1>Websocket test</h1>
            <div className="request-info">
                <p>Is connected: <code><b>{isConnected ? 'yes' : 'no'}</b></code></p>
                <p>Message hystory:</p>
                <div>
                    {!allMessages ? '—' : allMessages}
                </div>
            </div>
        </div>
    )
}
