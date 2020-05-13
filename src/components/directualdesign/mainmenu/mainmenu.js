import React from 'react'
import {
    NavLink
} from 'react-router-dom'
import { authContext } from '../../../auth'
import { Backdrop } from '../primitive/primitiveComponents'
import { LogInLogOutButton } from '../rbac/rbac'

import './MainMenu.css'

// MAIN MENU

export class MainMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMobileMenu: false,
        };
    }
    render() {
        const authContext = this.context;

        const handleCloseMobileMenu = () => {
            this.setState({ showMobileMenu: false })

        }
        const handleShowMobileMenu = () => {
            this.setState({ showMobileMenu: true })
        }

        return (
            <React.Fragment>
                {this.state.showMobileMenu && <Backdrop onClick={handleCloseMobileMenu} />}
                <div className="show-mm-button" onClick={handleShowMobileMenu}></div>
                <div className={`main-menu ${this.state.showMobileMenu && `show`}`}>
                    <div className="hide-mobile-menu" onClick={handleCloseMobileMenu}></div>

                    <ul className="main-menu-list">
                        {this.props.menu.map(item =>
                            <React.Fragment>
                                {!item.isAutorised && !item.hasRole &&
                                    <React.Fragment>
                                        {(item.type === 'subheader') && <li className="mm-subheader">{item.title}</li>}
                                        {(item.type === 'link') &&
                                            <li><NavLink
                                                onClick={handleCloseMobileMenu}
                                                exact to={item.path}
                                                className={`main-nav ${item.icon && `icon icon-${item.icon}`}`}>
                                                {item.title}
                                            </NavLink>
                                            </li>
                                        }
                                    </React.Fragment>
                                }
                                {item.isAutorised && authContext.isAutorised() && !item.hasRole &&
                                    <React.Fragment>
                                        {(item.type === 'subheader') && <li className="mm-subheader">{item.title}</li>}
                                        {(item.type === 'link') &&
                                            <li><NavLink
                                                onClick={handleCloseMobileMenu}
                                                exact to={item.path}
                                                className={`main-nav ${item.icon && `icon icon-${item.icon}`}`}>
                                                {item.title}
                                            </NavLink>
                                            </li>
                                        }
                                    </React.Fragment>
                                }
                                {item.hasRole && authContext.hasRole(item.hasRole) &&
                                    <React.Fragment>
                                        {(item.type === 'subheader') && <li className="mm-subheader">{item.title}</li>}
                                        {(item.type === 'link') &&
                                            <li><NavLink
                                                onClick={handleCloseMobileMenu}
                                                exact to={item.path}
                                                className={`main-nav ${item.icon && `icon icon-${item.icon}`}`}>
                                                {item.title}
                                            </NavLink>
                                            </li>
                                        }
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        )}
                    </ul>
                    <LogInLogOutButton onClick={handleCloseMobileMenu} />
                </div>
            </React.Fragment>
        )
    }
}
MainMenu.contextType = authContext
