import { useHistory, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useAuth } from "../auth";

export default function LoginPage() {
    let history = useHistory()
    let location = useLocation()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    let { from } = location.state || { from: { pathname: '/' } }
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAutorised()) {
            history.replace(from);
        }
    })
    let login = () => {
        
        setLoading(true)
        auth.login(username, password).then(() => {
            history.replace(from);
            setLoading(false)
        }).catch(e => {
            setError("You login or password incorrect");
            setLoading(false)
        })
        return false
    }

    return (
        <div>
            <p>You must log in to view the the page {from.pathname}</p>
            <input onChange={(e) => {
                setUsername(e.target.value)
            }} /><br />
            <input onChange={(e) => {
                setPassword(e.target.value)
            }} /><br />
            {error}<br />
            {!loading ? <button onClick={login}>Log in</button> : <span>loading...</span>}
        </div>
    )
}