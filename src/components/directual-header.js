import React from 'react';

import '../assets/styles/directual-header.css'
import Directual_logo from '../assets/images/directual-logo.svg'
import Directual_logo_small from '../assets/images/directual-logo-small.svg'
import arrow_right from '../assets/images/love.svg'
import React_logo from '../assets/images/react-logo.svg'
import Github_logo from '../assets/images/github-logo.svg'

export default function DirectualHeader() {
    return (
        <div className="directual-header">
            <div className="logos">
                <img src={Directual_logo} />
                <img src={arrow_right} />
                <img src={React_logo} />
            </div>
            <div className="gitHub-link">
                <img src={Github_logo} />
                <p className="desc">
                    Directual React boilerplate v 0.1.0<br /><a href="">See it on GitHub</a>
                </p>
            </div>
            <div className="directual-link">
                <a href="https://directual.com?utm_source=boilerplate" className="blue-button">Go to Directual</a>
                <a href="https://directual.com?utm_source=boilerplate" className="blue-button logo">
                    <img src={Directual_logo_small} />
                </a>
            </div>
        </div>
    )
}