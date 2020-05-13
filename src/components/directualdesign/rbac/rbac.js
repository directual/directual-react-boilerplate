import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../../../auth'
import {
    Link, useHistory, useLocation,
    Route, Redirect
} from 'react-router-dom'
import { Button } from '../primitive/primitiveComponents'
import { Input } from '../form/form'


import './login.css'

const api = new Directual({ apiHost: '/' })

// RBAC

export function AccessDenied() {
    return <div className="access-denied">Access Denied</div>
}

export function LoginRegister(props) {
    let history = useHistory()
    let location = useLocation()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let { from } = location.state || { from: { pathname: '/' } }
    const auth = useAuth();

    let login = () => {
        auth.login(username, password).then(() => {
            history.replace(from);
        }).catch(e => {
            setError("You login or password is incorrect")
        })
    }

    useEffect(() => {
        if (auth.isAutorised()) {
            history.replace(from);
        }
    })

    return (
        <React.Fragment>
            <h1>Log in</h1>
            <div className="login-page dd-form">
                {(from.pathname !== '/') && <div className="alert">You must log in to view the page <strong>{from.pathname}</strong></div>}
                <Input
                    label="Login"
                    type="text"
                    placeholder="enter your login"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <Input
                    label="Login"
                    type="password"
                    placeholder="enter your login"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <div className="error">{error}</div>
                <Button onClick={login} accent icon="permission">
                    Log in</Button>
            </div>
        </React.Fragment>
    )
}

export function LogInLogOutButton(props) {
    let history = useHistory()
    const auth = useAuth();
    return <div className="login-logout"> {auth.user ? (
        <Button icon="logout"
            onClick={() => {
                auth.signout(() => history.push('/'))
                props.onClick()
            }}
        >
            Log out
        </Button>
    ) : (
            <Link to="/login" onClick={props.onClick}>
                <Button icon="permission">Login</Button></Link>
        )}
    </div>
}

// Private Routing
export function PrivateRoute({ children, hasRole, ...rest }) {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isAutorised() && auth.hasRole(hasRole) ? (
                    children
                ) : auth.isAutorised() && !auth.hasRole(hasRole) ? <AccessDenied /> : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}