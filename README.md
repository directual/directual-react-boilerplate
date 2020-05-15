![Directual + React](https://api.alfa.directual.com/fileUploaded/directual-site/6568640f-ea12-4f65-90a5-173aaabdb019.jpg)

# React boilerplate-code for integrating with Directual as a backend

[Directual](https://directual.com) is a low-code platform for building backend *visually*. 

Directual matches React perfectly providing you with:
- Database;
- Authentication and RBAC;
- API-builder;
- Integrations.

**There are two options to use this boilerplate:**

- [Bootstrap your app from scratch cloning this repo](#option-1-bootstrap-your-app-from-scratch);
- [Connect your existing React-app, following the instructions below](#option-2-adding-directual-integration-to-your-existing-react-app)


# Option 1. Bootstrap your app from scratch


## Step 1. Cloning directual-react-boilerplate repo

1. Open Terminal.
2. Change the current working directory to the location where you want the new project to be made. If you need to create new directory type `mkdir NAME-OF-DIRECTORY` and then `cd NAME-OF-DIRECTORY`
3. Type `git clone https://github.com/directual/directual-react-boilerplate.git`
4. Type `cd directual-react-boilerplate`
5. Type `npm install`
6. Type `npm start` Here is what you'll get:
![Directual-React boilerplate](https://api.alfa.directual.com/fileUploaded/directual-site/85b2f4d5-cbd0-4fbd-91ff-21716efb4349.jpg)
## Step 1. Copying your Directual APP ID into .env file
Go to your [Directual account](https://my.directual.com/), into your app. Then to 'integration' section, API keys. Create new one and copy it:
![Api key](
https://api.alfa.directual.com/fileUploaded/directual-site/3f218ee3-4616-43b5-bb3e-cad4c65b5eb6.jpg)
Open `.env` in root directory. Copy you APP_ID there (example: `APP_ID=050e77bb-b0e6-4685-8712-a85774fad27`)

**IMPORTANT**: You have to stop your app (Control+C) and type `npm start` again after editing `.env`

## Step 2. Testing authentication
Go to Database section in Directual. Choose structure `App users`:

![WebUsers](https://api.alfa.directual.com/fileUploaded/directual-site/0cdf62fa-496e-4c49-8727-6cf680cbb5b5.jpg)
This data structure contains all the users, with their logins (`id` property) and encrypted passwords:

![User](
https://api.alfa.directual.com/fileUploaded/directual-site/c5e3db89-36cb-47fe-9750-38b0ccf2b7d7.jpg)
Add a user to test authentiction in your app! Remember—password have to be converted to MD5 (there is a button near this field)

After logging in you'll see Private page (for all users) and Admin page, if you add *'admin'* value to property `role` for your user in Directual.

![Directual-React boilerplate](https://api.alfa.directual.com/fileUploaded/directual-site/081995d7-7003-4cc2-8a97-a51b43083d23.jpg)
![RBAC](https://api.alfa.directual.com/fileUploaded/directual-site/a37e7629-6ee1-4543-943d-b5fcf6b30825.jpg)
## Step 3. Happy hacking!

### Setting up site structure

Have a look at `src/App.js` and `src/components/menu/menu.js` files.

Here we can configure routing:

`src/App.js`
```javascript
...

function App() {
  return (
    <ProvideAuth>
      <Router>
        <MainMenu />

        <Switch>
         {/* Public pages */}
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <Page1 />
          </Route>
          <Route exact path="/page2">
            <Page2 />
          </Route>
          
          {/* Pages for any authorised user */}
          <PrivateRoute path="/private">
            <PrivatePage />
          </PrivateRoute>
          
          {/* Pages for users, who have role == 'admin'. You can apply any other value here */}
          <PrivateRoute path="/admin" hasRole={'admin'}>
            <AdminPage />
          </PrivateRoute>

          {/* This is for pages like your.app/books/the-bible, wthere 'the-bible' in nan Object ID */}
          {/* <Route exact path="/table/:id" component={Child}/> */}
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

...
```

Here we can se an example of hidden JSX:

`src/pages/Page3.js`
```javascript
import React from 'react'
import { authContext, useAuth } from '../auth'

export default function Page3() {
    const authContext = useAuth();
    return (
        <div className="content">
            <h1>Page with hidden content</h1>

            <p>This is <b>public</b> content. Try to login and see some hidden text!</p>

            {authContext.isAutorised() &&
                <p>This content is visible for <b>authorised users only</b></p>}

            {authContext.hasRole('admin') &&
                <p>This content is visible for a user with a <b>acertain role</b></p>}

        </div>
    )
}

  ...
```

The same feature for class Component:

`src/pages/Page3.js`
```javascript
import React from 'react'
import { authContext, useAuth } from '../auth'

export default class Page3 extends React.Component {
    render() {
        const authContext = this.context;
        return (
            <div className="content">
                <h1>Page with hidden content</h1>

                <p>This is <b>public</b> content. Try to login and see some hidden text!</p>

                {authContext.isAutorised() &&
                    <p>This content is visible for <b>authorised users only</b></p>}

                {authContext.hasRole('admin') &&
                    <p>This content is visible for a user with a <b>acertain role</b></p>}

            </div>
        )
    }
}
Page3.contextType = authContext

```

### Getting data
2

### Posting data
3

## Final Step. Building and packing you product in Docker container
-



# Option 2. Adding Directual integration to your existing React app

## Create a react bootstrap project and bind required dependencies

`npm install -g create-react-app`

go to home directory and run command:

`npm init react-app directual-example`

go to the your new project folder:

`cd directual-example`

and install necessary libs: react-router-dom, directual-api:

`npm install react-router-dom --save `

`npm install directual-api --save `

`npm install http-proxy-middleware --save `

## Run you app

The command: `npm run start` runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload automatically if you make edits.<br />
You will also see lint errors in the console.


## Create middleware proxy to directual.api, for resolving problem linked with CORS

create file `.env` in root directory with you APP_ID,
example:
`.env`
`APP_ID=050e77bb-b0e6-4685-8712-a85774fad272`

You can find APP_ID in Api -> API keys section on [Directual](https://my.directual.com), 


create `src/setupProxy.js` file in you src directory, and insert this text

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');
const API_HOST = 'https://api.alfa.directual.com/'
// !Important, set APP_ID in , env file or set you APP ID here
const APP_ID = process.env.APP_ID

module.exports = function(app) {
  app.use(
    '/good/api',
    createProxyMiddleware({
      target: API_HOST,
      changeOrigin: true,
      pathRewrite(pathReq, req) {
        const pathname = pathReq.split('?')[0];
        let url = `${pathname}?appID=${APP_ID}`;
        url = Object
          .entries(req.query)
          .reduce(
            (newUrl, [key, value]) => `${newUrl}&${key}=${encodeURI(value)}`,
            url,
          );
        return url;
      }
    })
  );
};
```

## Create a simple site structure
create `pages` folder and insert 3 files

`src/pages/PublicPage.js`
```javascript
import React from 'react'

export default function PublicPage () {
  return (
    <div>
      <h2>Public Page</h2>
    </div>
  )
}
```
`src/pages/PrivatePage.js`
```javascript
import React from 'react'

export default function PrivatePage () {
  return (
    <div>
      <h2>Private Page</h2>
    </div>
  )
}
```
`src/pages/AdminPage.js`
```javascript
import React from 'react'

export default function AdminPage () {
  return (
    <div>
      <h2>Admin Page</h2>
    </div>
  )
}
```

`src/pages/LoginPage.js`
```javascript
import { useHistory, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useAuth } from "../auth";

export default function LoginPage() {
    let history = useHistory()
    let location = useLocation()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    let { from } = location.state || { from: { pathname: '/' } }
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAutorised()) {
            history.replace(from);
        }
    })
    let login = () => {
        setLoading(true)
        auth.login(username, password).then(() => {
            history.replace(from);
            setLoading(false)
        }).catch(e => {
            setError("You login or password incorrect");
            setLoading(false)
        })
    }

    return (
        <div>
            <p>You must log in to view the the page {from.pathname}</p>
            <input onChange={(e) => {
                setUsername(e.target.value)
            }} /><br />
            <input onChange={(e) => {
                setPassword(e.target.value)
            }} /><br />
            {error}<br />
            {!loading ? <button onClick={login}>Log in</button> : <span>loading...</span>}
        </div>
    )
}
```


create `src/components/LogInLogOutButton.js` file and 
`src/components/LogInLogOutButton.js`
```javascript

import React from 'react'
import { useAuth } from '../auth'
import {
    Link, useHistory
} from 'react-router-dom'

export function LogInLogOutButton() {
    let history = useHistory()
    const auth = useAuth();
    return (
        <React.Fragment>
            {auth.user ? (
                <button
                    onClick={() => {
                        auth.signout(() => history.push('/'))
                    }}
                >
                    Log out
                </button>
            ) : (
                    <Link to="/login">
                        <button>Log in</button></Link>
                )}
        </React.Fragment>)
}
```


create `src/auth.js` file and 

`src/auth.js`

```javascript
import React, { useState, useEffect, useContext, createContext } from "react";
import Directual from 'directual-api';

const api = new Directual({apiHost: '/'});

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [sessionID, setSessionID] = useState(null);
  const [role, setRole] = useState(null);

  const login = (username, password) => {
    return api.auth.login(username, password).then(res=>{
      setUser(res.username)
      setSessionID(res.sessionID)
      setRole(res.role)
      window.localStorage.setItem('sid', res.sessionID)
    })
  };

  const signout = (cb) => {
    return api.auth.logout('').then(res=>{
      setUser(null)
      setSessionID(null)
      window.localStorage.setItem('sid', null)
      cb()
    })
  };

  const isAutorised = () => {
    return !!user
  }

  const hasRole = (roleCheck) => {
    return role === roleCheck
  }

  useEffect(() => {
    let sid = window.localStorage.getItem('sid') || ''
    api.auth.isAuthorize(sid, (status, token)=>{
      if(status === true){
        setUser(token.username)
        setSessionID(token.sessionID)
        setRole(token.role)
      }
    })
  }, []);

  return {
    user,
    sessionID,
    login,
    isAutorised,
    signout,
    hasRole
  };
}
```


change you `src/App.js`

`src/App.js`

```javascript
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PrivatePage from './pages/PrivatePage'
import PublicPage from './pages/PublicPage'
import AdminPage from './pages/AdminPage'
import { ProvideAuth, useAuth, authContext } from "./auth";
import { LogInLogOutButton } from './components/LogInLogOutButton'


export function PrivateRoute({ children, hasRole, ...rest }) {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isAutorised() && auth.hasRole(hasRole) ? (
                    children
                ) : auth.isAutorised() && !auth.hasRole(hasRole) ? <div>Access denied!</div> : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

//example how use standart React components:

class MainMenu extends React.Component{
  render() {
    const authContext = this.context;
    return  (
    <ul>
      <li>
        <Link to="/">Public Page</Link>
      </li>
      {authContext.isAutorised() && <li>
        <Link to="/private">Private Page</Link>
      </li>}
      {authContext.hasRole('admin') && <li>
        <Link to="/admin">Admin Page</Link>
      </li>}
      <li>
        <LogInLogOutButton />
      </li>
    </ul>
    )
  }
}
MainMenu.contextType = authContext


function App () {
  useEffect( ()=>{

  })
  return ( <ProvideAuth>
    <Router>
        <MainMenu />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <PublicPage />
          </Route>
          <PrivateRoute path="/private" >
            <PrivatePage />
          </PrivateRoute>
          <PrivateRoute path="/admin" hasRole={'admin'} >
            <AdminPage />
          </PrivateRoute>
        </Switch>
    </Router>
    </ProvideAuth>
  )
}

export default App

```

## Connect directual-api

Open [ApiEndpoints](https://directual.gitbook.io/directual-documentation/api-integrations/api-endpoints-security-layer) section on Directual, 
choose any endpoint
and press 

`Endpoint respond preview`

after copy code in section `How it use? step 3` to useEffect function.


Example result page: `src/pages/DashboardPage.js`

```javascript
import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
const api = new Directual({apiHost: '/'});

export default function DashBoardPage () {
  const [payload, setPayload] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect( ()=>{
    api
      .structure('test')
      .getData('test', {sessionID:auth.sessionID})
      .then((response) => {
        setPayload(response.payload)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        if(!e.response){
          //check you API endpoint, you must enable CORS header in settings
        }
        if(e.response && e.response.status === 403){
          //todo: api endpoint required authorisation
        }
      })
  }, [])
  return (
    <div>
      <h2>Dashboard</h2>
      {loading && <span>loading</span>}
      {payload.map((data)=>{
        return <div>{JSON.stringify(data)}</div>
      })}
    </div>
  )
}
```

## Build and pack you product in docker container

#### Create Docker file in root directory
Create `Dockerfile` with following body:

```
FROM node:14.0.0-buster-slim
ENV BUILD_PATH /usr/src/app
ENV COMMIT_SHORT COMMIT_PLACEHOLDER
ENV DOCKER_TAG TAG_PLACEHOLDER

RUN mkdir -p $BUILD_PATH
WORKDIR $BUILD_PATH
COPY . $BUILD_PATH
RUN npm install
RUN npm run build

FROM node:14.0.0-buster-slim

ENV SERVER_FOLDER /opt/app/
RUN mkdir -p $SERVER_FOLDER
WORKDIR $SERVER_FOLDER

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN npm install --global express && npm link express && \
npm install --global http-proxy-middleware && npm link http-proxy-middleware

ENV NODE_SERVER_PORT=${NODE_SERVER_PORT:-8080}

COPY server/ $SERVER_FOLDER/server
RUN mkdir -p $SERVER_FOLDER/src
COPY src/setupProxy.js $SERVER_FOLDER/src/setupProxy.js
COPY --from=0 /usr/src/app/build $SERVER_FOLDER/build

EXPOSE $NODE_SERVER_PORT $NODE_INSPECT_PORT

ENTRYPOINT exec node ./server/server.js

```


Create proxy server in server directory:

`server/server.js`


```
const path = require('path');
const express = require('express');
const proxy = require('../src/setupProxy')
const SERVER_PORT = 8080;

const app = express();
app.use(express.static(path.join(__dirname, '../build')));
proxy(app)

const server = app.listen(SERVER_PORT, () => {
  console.log(`start webserver: http://localhost:${SERVER_PORT} \nAPP ID: ${process.env.APP_ID} `);
});

module.exports = app;
```

#### Build docker image
run command: `docker build -t final_image_name .`

#### Run you image

`docker run -d -p 8080:8080 -e APP_ID='__YOU_APP_ID__' final_image_name`

