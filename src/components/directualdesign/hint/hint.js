import React from 'react'

import './hint.css'

// HINT

export function Hint(props) {
    return (
        <blockquote className={`hint ${props.ok && `ok`} ${props.error && `error`}`}>
            {props.title && <p className="title">{props.title}</p>}
            <p>{props.children}</p>
        </blockquote>
    )
}