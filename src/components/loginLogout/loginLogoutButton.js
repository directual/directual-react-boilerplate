
import React from 'react'
import { useAuth } from '../../auth'
import {
    Link, useHistory
} from 'react-router-dom'

export function LogInLogOutButton() {
    let history = useHistory()
    const auth = useAuth();
    return (
        <React.Fragment>
            {auth.user ? (
                <button
                    onClick={() => {
                        auth.signout(() => history.push('/'))
                    }}
                >
                    Log out
                </button>
            ) : (
                    <Link to="/login">
                        <button>Log in</button></Link>
                )}
        </React.Fragment>)
}