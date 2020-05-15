
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth'
import {
    Link, useHistory
} from 'react-router-dom'

import { Loader } from '../loader/loader';

export function LogInLogOutButton() {
    let history = useHistory()
    const auth = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false)
      }, [auth.user]);

    return (
        <React.Fragment>
            {auth.user ? (
                <React.Fragment>
                { !loading ? (

                <button
                    onClick={() => {
                        auth.signout(() => history.push('/'));
                        setLoading(true)
                    }}
                >
                    Log out
                </button>
                
                ) :
                ( <Loader text='Logging out...'/> )}

                </React.Fragment>

            ) : (
                    <Link to="/login">
                        <button>Log in</button></Link>
                )}
        </React.Fragment>)
}