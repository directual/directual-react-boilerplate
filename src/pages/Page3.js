import React from 'react'
import { authContext, useAuth } from '../auth'

export default function Page3() {
    const authContext = useAuth();
    return (
        <div className="content">
            <h1>Page with hidden content</h1>

            <p>This is <b>public</b> content. Try to login and see some hidden text!</p>

            {authContext.isAutorised() &&
                <p>This content is visible for <b>authorised users only</b></p>}

            {authContext.hasRole('admin') &&
                <p>This content is visible for a user with a <b>acertain role</b></p>}

        </div>
    )
}

// Example how it would look if we used class Component:
// IMPORTNT: for class Components we use authContext instead of useAuth from 'auth.js'

// export default class Page3 extends React.Component {
//     render() {
//         const authContext = this.context;
//         return (
//             <div className="content">
//                 <h1>Page with hidden content</h1>

//                 <p>This is <b>public</b> content. Try to login and see some hidden text!</p>

//                 {authContext.isAutorised() &&
//                     <p>This content is visible for <b>authorised users only</b></p>}

//                 {authContext.hasRole('admin') &&
//                     <p>This content is visible for a user with a <b>acertain role</b></p>}

//             </div>
//         )
//     }
// }
// Page3.contextType = authContext