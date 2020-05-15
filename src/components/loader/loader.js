import React from 'react'
import './loader.css'

export function Loader(props) {
    return (
        <div className="loader-wrapper">
            <div className="loader"></div>
            <span className="loader-text">{props.text || 'Loading...'}</span>
        </div>
    )
}