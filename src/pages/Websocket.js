import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {useAuth} from "../auth";

const socket = io('', {autoConnect: false})

//or you could connect without proxy
//const socket = io('https://api.directual.com/', {autoConnect: false})

export default function Websocket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState(null);
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAutorised()) {
            fetch("/appid").then((response) => {
                response.json().then(data => {
                    socket.auth = {app_id: data.APP_ID, session_id: auth.sessionID};
                    socket.connect();
                })
            })
        }

        //subscribe to any events
        socket.onAny((eventName, args) => {
            setMessage(`${eventName}: ${JSON.stringify(args)}`);
        });

        //subscribe to only 'message' events
        socket.on('message', (msg) => {
            setMessage(msg);
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

    return (
        <div className="content">
            <h1>Websocket test</h1>
            <div className="request-info">
                <span>Is connected: {isConnected ? 'yes' : 'no'}</span>
                <span>Last message: {!message ? '-' : message}</span>
            </div>
        </div>
    )
}
