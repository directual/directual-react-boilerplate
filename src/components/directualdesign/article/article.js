import React from 'react'

import './article.css'

export function Article(props) {
    return (
        <div className="article">
            {props.children}
        </div>
    )
}