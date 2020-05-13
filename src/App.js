import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  NavLink
} from 'react-router-dom'

import { ProvideAuth } from "./auth"
import DirectualHeader from "./components/directual-header"

import { MainMenu } from './components/directualdesign/mainmenu/mainmenu'
import { SetTheme } from './components/directualdesign/theme/theme'
import { PageContent } from './components/directualdesign/primitive/primitiveComponents'
import { PrivateRoute } from './components/directualdesign/rbac/rbac'

import { WhatIsIt } from './pages/what-is-it'
import { FormView } from './pages/form-view'
import { TableView } from './pages/table-view'
import { CardsView } from './pages/cards-veiw'
import { LoginPage } from './pages/login'
import { ThemePage } from './pages/theme'
import { MyAccount } from './pages/my-account'

// Styles
import './assets/styles/App.css';


// const Child = ({ match }) => {
//   return (
//   <div>ID: {match.params.id}</div>
//   )
// } 


function App() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <DirectualHeader />
      <SetTheme/>
      <ProvideAuth>
        <Router>
          <div className="content-wrapper">
            <MainMenu
              menu={
                [
                  {
                    type: 'subheader',
                    title: 'Public pages'
                  },
                  {
                    type: "link",
                    title: 'What is it?',
                    path: '/',
                    icon: 'info'
                  },
                  {
                    type: "link",
                    title: 'Table view',
                    path: '/table',
                    icon: 'database'
                  },
                  {
                    type: "link",
                    title: 'Cards view',
                    path: '/cards-view',
                    icon: 'cards'
                  },
                  {
                    type: "link",
                    title: 'Form',
                    path: '/form',
                    icon: 'edit'
                  },
                  {
                    type: "link",
                    title: 'Theme',
                    path: '/theme',
                    icon: 'styles',
                  },
                  {
                    type: 'subheader',
                    title: 'Private pages',
                    isAutorised: true
                  },
                  {
                    type: "link",
                    title: 'My account',
                    path: '/account',
                    icon: 'user',
                    isAutorised: true
                  },
                  {
                    type: 'subheader',
                    title: 'Admin pages',
                    isAutorised: true,
                    hasRole:'admin'
                  },
                  {
                    type: "link",
                    title: 'Admin dashboard',
                    path: '/admin',
                    icon: 'babai',
                    isAutorised: true,
                    hasRole:'admin'
                  }
                ]
              }

            />

            <PageContent>
              <Switch>
                <Route path="/login">
                  <LoginPage />
                </Route>

                <Route exact path="/">
                  <WhatIsIt />
                </Route>
                <Route exact path="/table">
                  <TableView />
                </Route>
                {/* <Route exact path="/table/:id" component={Child}/> */}
                <Route exact path="/theme">
                  <ThemePage />
                </Route>
                <Route exact path="/cards-view">
                  <CardsView />
                </Route>
                <Route exact path="/form">
                  <FormView />
                </Route>

                <PrivateRoute path="/account">
                  <MyAccount />
                </PrivateRoute>

                <PrivateRoute exact path="/admin" hasRole={'admin'}>
                  <h1>Secret dashboard</h1>
                </PrivateRoute>

              </Switch>
            </PageContent>

          </div>

        </Router>
      </ProvideAuth>

    </React.Fragment>
  );
}

export default App;
