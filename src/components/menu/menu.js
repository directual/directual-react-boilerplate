import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogInLogOutButton } from '../loginLogout/loginLogoutButton'
import { authContext } from '../../auth'


//example how use standart React components:

export class MainMenu extends React.Component{
    render() {
      const authContext = this.context;
      return  (
      <ul>
        <li>
          <NavLink to="/">Public Page 1</NavLink>
        </li>
        <li>
          <NavLink to="/page2">Public Page 2</NavLink>
        </li>
        {authContext.isAutorised() && <li>
          <NavLink to="/private">Private Page</NavLink>
        </li>}
        {authContext.hasRole('admin') && <li>
          <NavLink to="/admin">Admin Page</NavLink>
        </li>}
        <li>
          <LogInLogOutButton />
        </li>
      </ul>
      )
    }
  }
  MainMenu.contextType = authContext