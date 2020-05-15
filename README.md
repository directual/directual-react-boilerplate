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
2

### Posting data
3

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
