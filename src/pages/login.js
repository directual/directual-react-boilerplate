import React from 'react'
import { Hint } from '../components/directualdesign/hint/hint'
import { LoginRegister } from '../components/directualdesign/rbac/rbac'

export function LoginPage() {
    return (
        <React.Fragment>
            <LoginRegister />

            {/* Test login/pass for public version of the boilerplate 
                Remove this piece of code */}
            <Hint title='Login as a user'>
                <p>Login: <code>user</code>, pass: <code>directual</code></p>
            </Hint>
            <Hint title='Log in as an admin'>
                <p>Login: <code>admin</code>, pass: <code>directual</code></p>
            </Hint>
            {/* ————————————————————————— */}
            
        </React.Fragment>
    )
}