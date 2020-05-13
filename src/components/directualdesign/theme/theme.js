import React from 'react'
import { PageHeader } from '../primitive/primitiveComponents'
import { Radio } from '../form/form'

import './theme.css'

// Theming
export function SetTheme() {
    return (
        <ChangeTheme initial />
    )
}

export function ChangeTheme(props) {
    let currentTheme = localStorage.getItem('dd-theme')
    !currentTheme && (currentTheme = 'classic')

    const setTheme = theme => {
        localStorage.setItem('dd-theme', theme)
        if (theme === 'classic') {
            document.documentElement.style.setProperty('--button-border-color', '#8E8E8E')
            document.documentElement.style.setProperty('--field-border-color', '#aaa')
            document.documentElement.style.setProperty('--table-border-color', 'rgba(0,0,0,.12)')
            document.documentElement.style.setProperty('--accent-color', '#058efc')
            document.documentElement.style.setProperty('--secondary-accent-color', '#0062BD')
            document.documentElement.style.setProperty('--button-accent-color', '#fff')
            document.documentElement.style.setProperty('--background-color', '#ffffff')
            document.documentElement.style.setProperty('--secondary-background-color', '#eeeeee')
            document.documentElement.style.setProperty('--font-color', '#333333')
            document.documentElement.style.setProperty('--hint-color', '#333')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', '#eeeeee')
            document.documentElement.style.setProperty('--error-color', '#FF525B')
            document.documentElement.style.setProperty('--error-color-light', '#FFD6D8')
            document.documentElement.style.setProperty('--alert-color', '#ECA910')
            document.documentElement.style.setProperty('--alert-color-light', '#F9DFA4')
            document.documentElement.style.setProperty('--ok-color', '#00C197')
            document.documentElement.style.setProperty('--ok-color-light', '#D6F8E5')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#B9E0CB')
            document.documentElement.style.setProperty('--label-text-color', '#333')
        }
        if (theme === 'tiffany') {
            document.documentElement.style.setProperty('--button-border-color', '#8E8E8E')
            document.documentElement.style.setProperty('--field-border-color', '#aaa')
            document.documentElement.style.setProperty('--table-border-color', 'rgba(0,0,0,.12)')
            document.documentElement.style.setProperty('--accent-color', '#4ad5c8')
            document.documentElement.style.setProperty('--secondary-accent-color', '#37aea3')
            document.documentElement.style.setProperty('--button-accent-color', '#fff')
            document.documentElement.style.setProperty('--background-color', '#ffffff')
            document.documentElement.style.setProperty('--secondary-background-color', '#eeeeee')
            document.documentElement.style.setProperty('--font-color', '#333333')
            document.documentElement.style.setProperty('--hint-color', '#333')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', '#eeeeee')
            document.documentElement.style.setProperty('--error-color', '#FF525B')
            document.documentElement.style.setProperty('--error-color-light', '#FFD6D8')
            document.documentElement.style.setProperty('--alert-color', '#ECA910')
            document.documentElement.style.setProperty('--alert-color-light', '#F9DFA4')
            document.documentElement.style.setProperty('--ok-color', '#00C197')
            document.documentElement.style.setProperty('--ok-color-light', '#D6F8E5')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#FFCCA9')
            document.documentElement.style.setProperty('--label-text-color', '#333')
        }
        if (theme === 'dark-mint') {
            document.documentElement.style.setProperty('--button-border-color', '#2f00ff')
            document.documentElement.style.setProperty('--field-border-color', 'rgba(255,255,255,.2)')
            document.documentElement.style.setProperty('--table-border-color', 'rgba(255,255,255,.2)')
            document.documentElement.style.setProperty('--accent-color', '#00ff98')
            document.documentElement.style.setProperty('--secondary-accent-color', '#02c073')
            document.documentElement.style.setProperty('--button-accent-color', ' #131022')
            document.documentElement.style.setProperty('--background-color', '#131022')
            document.documentElement.style.setProperty('--secondary-background-color', '#1c1d3b')
            document.documentElement.style.setProperty('--font-color', '#fff')
            document.documentElement.style.setProperty('--hint-color', '#fff')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', 'rgba(255,255,255,0.7)')
            document.documentElement.style.setProperty('--error-color', '#FF525B')
            document.documentElement.style.setProperty('--error-color-light', '#6B4151')
            document.documentElement.style.setProperty('--alert-color', '#ECA910')
            document.documentElement.style.setProperty('--alert-color-light', '#665846')
            document.documentElement.style.setProperty('--ok-color', '#00C197')
            document.documentElement.style.setProperty('--ok-color-light', '#346266')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#2f00ff')
            document.documentElement.style.setProperty('--label-text-color', 'rgba(255,255,255,.85)')
        }
        if (theme === 'warm-night') {
            document.documentElement.style.setProperty('--button-border-color', '#ce9306')
            document.documentElement.style.setProperty('--field-border-color', 'rgba(255,255,255,.2)')
            document.documentElement.style.setProperty('--table-border-color', 'rgba(255,255,255,.2)')
            document.documentElement.style.setProperty('--accent-color', '#85c92e')
            document.documentElement.style.setProperty('--secondary-accent-color', '#8fff00')
            document.documentElement.style.setProperty('--button-accent-color', ' #142025')
            document.documentElement.style.setProperty('--background-color', '#303d47')
            document.documentElement.style.setProperty('--secondary-background-color', '#142025')
            document.documentElement.style.setProperty('--font-color', '#c2c6cb')
            document.documentElement.style.setProperty('--hint-color', '#fff')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', 'rgba(255,255,255,0.7)')
            document.documentElement.style.setProperty('--error-color', '#ce4144')
            document.documentElement.style.setProperty('--error-color-light', '#763136')
            document.documentElement.style.setProperty('--alert-color', '#cd9300')
            document.documentElement.style.setProperty('--alert-color-light', '#745b0e')
            document.documentElement.style.setProperty('--ok-color', '#76ab24')
            document.documentElement.style.setProperty('--ok-color-light', '#476927')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#ce9306')
            document.documentElement.style.setProperty('--label-text-color', 'rgba(255,255,255,.85)')
        }

    }

    currentTheme && setTheme(currentTheme)
    const changeTheme = e => setTheme(e.target.value)

    const options =
        [
            {
                value: 'classic',
                label: 'Directual Blue, light theme'
            },
            {
                value: 'tiffany',
                label: 'Tiffany Blue, light theme'
            },
            {
                value: 'dark-mint',
                label: 'Denim-Mint, dark theme'
            },
            {
                value: 'warm-night',
                label: 'Warm Night, dark theme'
            }
        ]

    const userOptions = (props.themes && options.filter(option => props.themes.indexOf(option.value) != -1)) || options
    return (
        <React.Fragment>
            {!props.initial &&
                <React.Fragment>
                    <PageHeader icon="styles">{props.header || 'Choose theme'}</PageHeader>
                    <Radio
                        onChange={changeTheme}
                        defaultValue={currentTheme}
                        options={userOptions}
                    />
                </React.Fragment>}
        </React.Fragment>
    )
}