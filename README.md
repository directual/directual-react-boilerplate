![Directual + React](https://api.alfa.directual.com/fileUploaded/directual-site/6568640f-ea12-4f65-90a5-173aaabdb019.jpg)

# React boilerplate-code for integrating with Directual as a backend

[Directual](https://directual.com) is a low-code platform for building backend *visually*. 

Directual matches React perfectly providing you with:
- Database;
- Authentication and RBAC;
- API-builder;
- Integrations.

Main approach in this boilerplate is [React Hooks](https://reactjs.org/docs/hooks-intro.html). You can also find an [example of using class Components](#using-auth-context-in-class-components)( see `src/pages/Page3.js`).

### There are two options to use this boilerplate:

- [Bootstrap your app from scratch cloning this repo](#option-1-bootstrap-your-app-from-scratch);
- [Connect your existing React-app (or a React-template) with Directual](#option-2-adding-directual-integration-to-your-existing-react-app)

### We hope you enjoy Directual experience!

Our team is happy to hear your feedback and suggestions on current boilerplate and the platform. If you spot a mistake, notice something that needs improvement, or have an idea for the new platform feature, do not hesitate to contact us on [community forum](http://forum.directual.com/) or via [support@directual.com](mailto:support@directual.com)


# Option 1. Bootstrap your app from scratch

1. [Step 1. Cloning directual-react-boilerplate repo](#step-1-cloning-directual-react-boilerplate-repo)
2. [Step 2. Copying your Directual APP ID into .env file](#step-2-copying-your-directual-app-id-into-env-file)
3. [Step 3. Testing authentication](#step-3-testing-authentication)
4. [Step 4. Happy hacking!](#step-4-happy-hacking)
   - [Setting up site structure](#setting-up-site-structure)
   - [Getting data](#getting-data)
   - [Posting data](#posting-data)
5. [Final Step. Building and packing you product in Docker container](#final-step-building-and-packing-you-product-in-docker-container)

## Step 1. Cloning directual-react-boilerplate repo

1. Open Terminal.
2. Change the current working directory to the location where you want the new project to be made. If you need to create new directory type `mkdir NAME-OF-DIRECTORY` and then `cd NAME-OF-DIRECTORY`
3. Type `git clone https://github.com/directual/directual-react-boilerplate.git`
4. Type `cd directual-react-boilerplate`
5. Type `npm install`
6. Type `npm start` Here is what you'll get:
![Directual-React boilerplate](https://api.alfa.directual.com/fileUploaded/directual-site/85b2f4d5-cbd0-4fbd-91ff-21716efb4349.jpg)
## Step 2. Copying your Directual APP ID into .env file
Go to your [Directual account](https://my.directual.com/), into your app. Then to 'integration' section, API keys. Create new one and copy it:
![Api key](
https://api.alfa.directual.com/fileUploaded/directual-site/3f218ee3-4616-43b5-bb3e-cad4c65b5eb6.jpg)
Open `.env` in root directory. Copy you APP_ID there (example: `APP_ID=050e77bb-b0e6-4685-8712-a85774fad27`)

**IMPORTANT**: You have to stop your app (Control+C) and type `npm start` again after editing `.env`

## Step 3. Testing authentication
Go to Database section in Directual. Choose structure `App users`:

![WebUsers](https://api.alfa.directual.com/fileUploaded/directual-site/0cdf62fa-496e-4c49-8727-6cf680cbb5b5.jpg)
This data structure contains all the users, with their logins (`id` property) and encrypted passwords:

![User](
https://api.alfa.directual.com/fileUploaded/directual-site/c5e3db89-36cb-47fe-9750-38b0ccf2b7d7.jpg)
Add a user to test authentiction in your app! Remember—password have to be converted to MD5 (there is a button near this field)

After logging in you'll see Private page (for all users) and Admin page, if you add *'admin'* value to property `role` for your user in Directual.

![Directual-React boilerplate](https://api.alfa.directual.com/fileUploaded/directual-site/081995d7-7003-4cc2-8a97-a51b43083d23.jpg)
![RBAC](https://api.alfa.directual.com/fileUploaded/directual-site/a37e7629-6ee1-4543-943d-b5fcf6b30825.jpg)
## Step 4. Happy hacking!

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

          {/* This is for pages like your.app/books/the-bible, wthere 'the-bible' in an Object ID */}
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

Don't forget to configure [API-endpoints](https://directual.gitbook.io/directual-documentation/api-integrations/api-endpoints-security-layer) in Directual

Have a look at
`src/pages/Page1.js`
```javascript
import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';

// Example of getting data from Directual

// Connect to Directual api
const api = new Directual({ apiHost: '/' })

export default function Page1() {

  // API-endpoint details
  const dataStructure = '' // todo: write here sysname of your data structure
  const endpoint = '' // todo: write here Method name of your API-endpoint

  // connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [payload, setPayload] = useState([]); // API response
  const [pageInfo, setPageInfo] = useState({}); // API response metadata, e.g. number of objects
  const [loading, setLoading] = useState(true); // initial loader
  const [badRequest, setBadRequest] = useState(); // API error message
  const [pageLoading, setPageLoading] = useState(false); // paging loader
  const [pageNum, setPageNum] = useState(0); // Page number, by default = 0
  const [pageSize, setPageSize] = useState(10); // Page size, bu default = 10

  // Paging
  useEffect(() => {
    setPageLoading(true)
    getData()
  }, [pageNum])

  const nextPage = () => {
    setPageLoading(true)
    setPageNum(pageNum + 1)
  }
  const prevPage = () => {
    setPageLoading(true)
    setPageNum(pageNum - 1)
  }

  // GET-request
  function getData() {
    api
      // Data structure
      .structure(dataStructure)
      // GET request + query params (sessionID, page, pageSize by default)
      .getData(endpoint, { sessionID: auth.sessionID, page: pageNum, pageSize: pageSize })
      // other possible query params:
      // {{HttpRequest}} — any param for Filtering
      // sort=FIELD_SYSNAME_1,desc,FIELD_SYSNAME_2,asc — sorting with multiple params
      .then((response) => {
        setPayload(response.payload)
        setPageInfo(response.pageInfo)
        setLoading(false)
        setPageLoading(false)
      })
      .catch((e) => {
        // handling errors
        setLoading(false)
        setPageLoading(false)
        console.log(e.response)
        setBadRequest(e.response.status + ', ' + e.response.data.msg)
      })
  }

  return (
    <div className="content">
      <h1>Example of getting data</h1>

      {loading && <Loader />}
      {payload && !loading &&
        <div>

          {/* API response */}
          <div className="request-info">
            <span>Data structure: <b>{dataStructure ? dataStructure : <span className="error">not provided</span>}</b></span>
            <span>API-endpoint: <b>{endpoint ? endpoint : <span className="error">not provided</span>}</b></span>
            <span>Payload: <code>{JSON.stringify(payload)}</code></span>
            <span>Payload info: <code>{JSON.stringify(pageInfo)}</code></span>
            {badRequest && <code className="error">Error: <b>{badRequest}</b></code>}
          </div>

          {/* Paging */}
          {pageLoading && <Loader />}
          {!pageLoading &&
            <div>
              <button disabled={(pageNum <= 0) && "disabled"} onClick={prevPage}>prev</button>
              <button disabled={(badRequest || (pageNum >= pageInfo.totalPage - 1)) && "disabled"} onClick={nextPage}>next</button>
            </div>
          }

        </div>}
    </div>
  )
}
```

### Posting data

Don't forget to configure [API-endpoints](https://directual.gitbook.io/directual-documentation/api-integrations/api-endpoints-security-layer) in Directual

Have a look at
`src/pages/Page2.js`
```javascript
import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';

// Example of posting data to Directual

// Connect to Directual api
const api = new Directual({ apiHost: '/' })

export default function Page2() {

  // API-endpoint details
  const dataStructure = '' // todo: write here sysname of your data structure
  const endpoint = '' // todo: write here Method name of your API-endpoint

  // Connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [response, setResponse] = useState(); // API response
  const [status, setStatus] = useState(); // Request status
  const [badRequest, setBadRequest] = useState(); // API error message
  const [loading, setLoading] = useState(false); // Loader
  const [showForm, setShowForm] = useState(true); // Show/hide the form
  const [formPayload, setFormPayload] = useState({}); // Data to send. Here we can add userID: auth.user by default

  // Reset the form
  const resetForm = () => {
    setResponse()
    setStatus()
    setBadRequest()
    setShowForm(true)
    setFormPayload({}) // Don't forget to include userID: auth.user, if needed
  }

  // POST-request
  function postData() {
    setLoading(true)
    setShowForm(false)
    api
      // Data structure
      .structure(dataStructure)
      // POST request + payload + query params:
      .setData(endpoint, formPayload,
        { sessionID: auth.sessionID })
      .then((response) => {
        setResponse(response.result)
        setStatus(response.status)
        setLoading(false)
      })
      .catch((e) => {
        // handling errors
        setLoading(false)
        console.log(e.response)
        setBadRequest({
          httpCode: e.response.status,
          msg: e.response.data.msg
        })
      })
  }

  return (
    <div className="content">
      <h1>Example of posting data</h1>
      {loading && <Loader />}
      {showForm &&
        <form onSubmit={postData}>
          <input type="text" onChange={(e) => {
            // insert here your FIELD_SYSNAME
            setFormPayload({ ...formPayload, 'FIELD_SYSNAME': e.target.value })
          }} />
          <button type="submit">Submit</button>
        </form>
      }

      {/* Everything is OK */}
      {response && <div>
        <b>Submitted successfully</b>
        <p>Response: <code>{JSON.stringify(response)}</code></p>
        {status && <p>Status: <code>{JSON.stringify(status)}</code></p>}
      </div>}

      {/* Something went wrong */}
      {badRequest && <div class="error">
        <b>{badRequest.httpCode} error</b>
        {(badRequest.httpCode == '400') &&
          <p>API-endpoint is not configured properly.</p>}
        {(badRequest.httpCode == '403') &&
          <p>You have to be logged in to submit this form.</p>}
        <p><code>{badRequest.msg}</code></p>
      </div>}

      {/* Reset the form */}
      {!showForm && !loading &&
        <button onClick={resetForm}>
          Submit again
        </button>}

    </div>
  )
}
```


## Final Step. Building and packing you product in Docker container

Create in the root directory `Dockerfile` with the following body:

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
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
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




# Option 2. Adding Directual integration to your existing React app

1. [Step 1. Bind required dependencies](#step-1-bind-required-dependencies)
2. [Step 2. Setup middleware proxy](#step-2-setup-middleware-proxy)
3. [Step 3. Add authentication](#step-3-add-authentication)
   - [Adding auth context](#adding-auth-context)
   - [Log in form](#log-in-form)
   - [Registration](#registration)
   - [Using auth context in functional components](#using-auth-context-in-functional-components)
   - [Using auth context in class components](#using-auth-context-in-class-components)
4. [Final step. Work with Directual database](#final-step-work-with-directual-database)
   - [Getting data](#getting-data-1)
   - [Posting data](#posting-data-1)

## Step 1. Bind required dependencies

Install necessary libs:

`npm install react-router-dom --save `

`npm install directual-api --save `

`npm install http-proxy-middleware --save `

## Step 2. Setup middleware proxy

Creating middleware proxy to directual.api resolves potential problems with CORS

Go to your [Directual account](https://my.directual.com/), into your app. Then to 'integration' section, API keys. Create new one and copy it:
![Api key](
https://api.alfa.directual.com/fileUploaded/directual-site/3f218ee3-4616-43b5-bb3e-cad4c65b5eb6.jpg)
Create `.env` in root directory of your project. Copy you APP_ID there (example: `APP_ID=050e77bb-b0e6-4685-8712-a85774fad27`)

**IMPORTANT**: You have to stop your app (Control+C) and type `npm start` again after editing `.env`

Create `src/setupProxy.js` file

and copy the following there:
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

## Step 3. Add authentication

Create `src/auth.js` file

and copy the following there:
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

// Provide hook that creates auth object and handles state
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
      setRole(null)
      setSessionID(null)
      window.localStorage.setItem('sid', null)
      cb()
    })
  };

  const isAutorised = () => {
    return !!user
  }

  const hasRole = (roleCheck) => {
    if(!roleCheck){
      return true
    }
    return role === roleCheck
  }

  useEffect(() => {
    let sid = window.localStorage.getItem('sid') || ''
    api.auth.isAuthorize(sid, (status, token)=>{
      if(status === true){
        setUser(token.username)
        setSessionID(token.token)
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

### Adding auth context

Add `import { ProvideAuth, useAuth, authContext } from './auth'` 
Wrap your app with `<ProvideAuth> </ProvideAuth>`

Use the following constructions:

### Log in form

```javascript
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useAuth();

    let login = () => {
        auth.login(username, password).then(() => {
            
        }).catch(e => {
            setError("You login or password is incorrect");
        })
        return false
    }

    return (
        <div>
            <input type="text" placeholder="login" onChange={(e) => {
                setUsername(e.target.value)
            }} />
            <input type="password" placeholder="password" onChange={(e) => {
                setPassword(e.target.value)
            }} />
            {error && <div className="error">{error}</div>}
            <button onClick={login}>Log in</button>
        </div>
    )
}
```

### Registration

Use regular [POST-requests](#posting-data-1) into `WebUser` data structure.

### Using auth context in functional components
```javascript
import { useAuth } from './auth' // here is the difference!

export default function Page3() {
    const authContext = useAuth(); // here is the difference!
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
```

### Using auth context in class components
```javascript
import { authContext } from './auth' // here is the difference!

export default class Page3 extends React.Component {
    render() {
        const authContext = this.context; // here is the difference!
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

## Final step. Work with Directual database

### Getting data

Don't forget to configure [API-endpoints](https://www.directual.com/academy/api-builder-basics) in Directual

Have a look at
`src/pages/Page1.js`
```javascript
import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';

// Example of getting data from Directual

// Connect to Directual api
const api = new Directual({ apiHost: '/' })

export default function Page1() {

  // API-endpoint details
  const dataStructure = '' // todo: write here sysname of your data structure
  const endpoint = '' // todo: write here Method name of your API-endpoint

  // connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [payload, setPayload] = useState([]); // API response
  const [pageInfo, setPageInfo] = useState({}); // API response metadata, e.g. number of objects
  const [loading, setLoading] = useState(true); // initial loader
  const [badRequest, setBadRequest] = useState(); // API error message
  const [pageLoading, setPageLoading] = useState(false); // paging loader
  const [pageNum, setPageNum] = useState(0); // Page number, by default = 0
  const [pageSize, setPageSize] = useState(10); // Page size, bu default = 10

  // Paging
  useEffect(() => {
    setPageLoading(true)
    getData()
  }, [pageNum])

  const nextPage = () => {
    setPageLoading(true)
    setPageNum(pageNum + 1)
  }
  const prevPage = () => {
    setPageLoading(true)
    setPageNum(pageNum - 1)
  }

  // GET-request
  function getData() {
    api
      // Data structure
      .structure(dataStructure)
      // GET request + query params (sessionID, page, pageSize by default)
      .getData(endpoint, { sessionID: auth.sessionID, page: pageNum, pageSize: pageSize })
      // other possible query params:
      // {{HttpRequest}} — any param for Filtering
      // sort=FIELD_SYSNAME_1,desc,FIELD_SYSNAME_2,asc — sorting with multiple params
      .then((response) => {
        setPayload(response.payload)
        setPageInfo(response.pageInfo)
        setLoading(false)
        setPageLoading(false)
      })
      .catch((e) => {
        // handling errors
        setLoading(false)
        setPageLoading(false)
        console.log(e.response)
        setBadRequest(e.response.status + ', ' + e.response.data.msg)
      })
  }

  return (
    <div className="content">
      <h1>Example of getting data</h1>

      {loading && <Loader />}
      {payload && !loading &&
        <div>

          {/* API response */}
          <div className="request-info">
            <span>Data structure: <b>{dataStructure ? dataStructure : <span className="error">not provided</span>}</b></span>
            <span>API-endpoint: <b>{endpoint ? endpoint : <span className="error">not provided</span>}</b></span>
            <span>Payload: <code>{JSON.stringify(payload)}</code></span>
            <span>Payload info: <code>{JSON.stringify(pageInfo)}</code></span>
            {badRequest && <code className="error">Error: <b>{badRequest}</b></code>}
          </div>

          {/* Paging */}
          {pageLoading && <Loader />}
          {!pageLoading &&
            <div>
              <button disabled={(pageNum <= 0) && "disabled"} onClick={prevPage}>prev</button>
              <button disabled={(badRequest || (pageNum >= pageInfo.totalPage - 1)) && "disabled"} onClick={nextPage}>next</button>
            </div>
          }

        </div>}
    </div>
  )
}
```

### Posting data

Don't forget to configure [API-endpoints](https://www.directual.com/academy/api-builder-basics) in Directual

Have a look at
`src/pages/Page2.js`
```javascript
import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';

// Example of posting data to Directual

// Connect to Directual api
const api = new Directual({ apiHost: '/' })

export default function Page2() {

  // API-endpoint details
  const dataStructure = '' // todo: write here sysname of your data structure
  const endpoint = '' // todo: write here Method name of your API-endpoint

  // Connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [response, setResponse] = useState(); // API response
  const [status, setStatus] = useState(); // Request status
  const [badRequest, setBadRequest] = useState(); // API error message
  const [loading, setLoading] = useState(false); // Loader
  const [showForm, setShowForm] = useState(true); // Show/hide the form
  const [formPayload, setFormPayload] = useState({}); // Data to send. Here we can add userID: auth.user by default

  // Reset the form
  const resetForm = () => {
    setResponse()
    setStatus()
    setBadRequest()
    setShowForm(true)
    setFormPayload({}) // Don't forget to include userID: auth.user, if needed
  }

  // POST-request
  function postData() {
    setLoading(true)
    setShowForm(false)
    api
      // Data structure
      .structure(dataStructure)
      // POST request + payload + query params:
      .setData(endpoint, formPayload,
        { sessionID: auth.sessionID })
      .then((response) => {
        setResponse(response.result)
        setStatus(response.status)
        setLoading(false)
      })
      .catch((e) => {
        // handling errors
        setLoading(false)
        console.log(e.response)
        setBadRequest({
          httpCode: e.response.status,
          msg: e.response.data.msg
        })
      })
  }

  return (
    <div className="content">
      <h1>Example of posting data</h1>
      {loading && <Loader />}
      {showForm &&
        <form onSubmit={postData}>
          <input type="text" onChange={(e) => {
            // insert here your FIELD_SYSNAME
            setFormPayload({ ...formPayload, 'FIELD_SYSNAME': e.target.value })
          }} />
          <button type="submit">Submit</button>
        </form>
      }

      {/* Everything is OK */}
      {response && <div>
        <b>Submitted successfully</b>
        <p>Response: <code>{JSON.stringify(response)}</code></p>
        {status && <p>Status: <code>{JSON.stringify(status)}</code></p>}
      </div>}

      {/* Something went wrong */}
      {badRequest && <div class="error">
        <b>{badRequest.httpCode} error</b>
        {(badRequest.httpCode == '400') &&
          <p>API-endpoint is not configured properly.</p>}
        {(badRequest.httpCode == '403') &&
          <p>You have to be logged in to submit this form.</p>}
        <p><code>{badRequest.msg}</code></p>
      </div>}

      {/* Reset the form */}
      {!showForm && !loading &&
        <button onClick={resetForm}>
          Submit again
        </button>}

    </div>
  )
}
```
