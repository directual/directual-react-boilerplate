import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogInLogOutButton } from '../loginLogout/loginLogoutButton'
import { authContext } from '../../auth'




export function MainMenu() {
  const auth = useAuth();
  return (
    <ul>
      <li>
        <NavLink to="/">Public Page 1</NavLink>
      </li>
      <li>
        <NavLink to="/page2">Public Page 2</NavLink>
      </li>

      {/* JSX visible for authorised users only */}
      {authContext.isAutorised() && <li>
        <NavLink to="/private">Private Page</NavLink>
      </li>}

       {/* JSX visible for users, who have role == 'admin'. You can apply any other value here */}
      {authContext.hasRole('admin') && <li>
        <NavLink to="/admin">Admin Page</NavLink>
      </li>}
      <li>
        <LogInLogOutButton />
      </li>
    </ul>
  )
}

//example how it would look if we used class Component:

// export class MainMenu extends React.Component{
//     render() {
//       const authContext = this.context;
//       return  (
//       <ul>
//         <li>
//           <NavLink to="/">Public Page 1</NavLink>
//         </li>
//         <li>
//           <NavLink to="/page2">Public Page 2</NavLink>
//         </li>
//         {authContext.isAutorised() && <li>
//           <NavLink to="/private">Private Page</NavLink>
//         </li>}
//         {authContext.hasRole('admin') && <li>
//           <NavLink to="/admin">Admin Page</NavLink>
//         </li>}
//         <li>
//           <LogInLogOutButton />
//         </li>
//       </ul>
//       )
//     }
//   }
//   MainMenu.contextType = authContext