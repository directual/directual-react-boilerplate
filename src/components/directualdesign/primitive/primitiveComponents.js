import React, { useEffect, useState } from 'react'

import './loader.css'
import './button.css'
import './backdrop.css'
import './pageContent.css'
import '../icons.css'
import '../fonts.css'

export function HideTextBlock(props) {
    const [expandText, setExpandText] = useState(false);
    const [textLength, setTextLength] = useState(props.textLength || 120);

    const expand = () => {
        setExpandText(true);
        setTextLength(3000);
    }

    const hide = () => {
        setExpandText(false);
        setTextLength(props.textLength || 120);
    }

    return (
        <div className="dd-hide-text">
            {(props.children.length <= textLength) && props.children}
            {(props.children.length > textLength) && props.children.substr(0, textLength) + '...'}
            {(props.children.length > textLength) && !expandText &&
                <div className="expand-text icon icon-down" onClick={expand}>
                    Expand</div>
            }
            {expandText &&
                <div className="expand-text icon icon-up" onClick={hide}>
                    Hide</div>
            }
        </div>
    )
}

export function Labels(props) {
    return (
        <ul className="dd-labels">
            {props.labels[0].length > 0 && props.labels.map(label =>
                <li className="dd-label">{label}</li>
            )}
        </ul>
    )
}

export function Loading(props) {
    return (
        <div className="loader-wrapper">
            <div className="loader"><div></div><div></div><div></div><div></div></div>
            <div className="loader-label">{props.children}</div>
        </div>
    )
}

export function Backdrop(props) {
    return (
        <div className="backdrop" onClick={props.onClick}>
        </div>
    )
}

export function PageContent(props) {
    return (
        <div className="page-content">
            {props.children}</div>
    )
}

export function PageHeader(props) {
    return (
        <h1 className={`dd-header ${props.icon && `icon icon-${props.icon}`}`}>{props.children}</h1>
    )
}

export function Button(props) {
    return (
        <button
            onClick={!props.disabled && props.onClick}
            className={`dd-button ${props.accent && `accent`} 
                ${props.disabled && `disabled`}
                ${props.icon && `icon icon-${props.icon}`}`}
        >
            {props.children}</button>
    )
}