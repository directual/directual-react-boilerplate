import React from 'react'
import './loader.css'

export function Loader() {
    return (
        <div className="loader-wrapper">
            <div className="loader"></div>
            <span className="loader-text">Loading...</span>
        </div>
    )
}