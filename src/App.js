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

import { MainMenu, PrivateRoute, PageContent, SetTheme } from './components/directualdesign/directual-design'

import { WhatIsIt } from './components/pages/what-is-it'
import { FormView } from './components/pages/form-view'
import { TableView } from './components/pages/table-view'
import { CardsView } from './components/pages/cards-veiw'
import { LoginPage } from './components/pages/login'
import { ThemePage } from './components/pages/theme'

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
                  // {
                  //   type: "link",
                  //   title: 'Table view',
                  //   path: '/table',
                  //   icon: 'database'
                  // },
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
                    title: 'My profile',
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
                  <h1>My profile</h1>
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
