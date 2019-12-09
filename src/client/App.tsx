import React, {Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
// TODO: very suboptimal...
import '@contentful/forma-36-fcss/dist/styles.css';
import '@contentful/forma-36-react-components/dist/styles.css';
import './App.css'

const MainTemplate = React.lazy(() => import("./components/MainTemplate/MainTemplate"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const UnauthTemplate = React.lazy(() => import("./components/UnauthTemplate"));
const Login = React.lazy(() => import('./components/Login/Login'));

export default () => {
  const loggedIn = false;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app">
          <Redirect to="/app/dashboard"/>
          <Suspense fallback={<div>Loading...</div>}>
            <MainTemplate>
              <Switch>
                <Route path={`/app/dashboard`}>
                  <Dashboard/>
                </Route>
              </Switch>
            </MainTemplate>
          </Suspense>
        </Route>
        <Route path="/">
          {loggedIn ? <Redirect to="/app"/> : <Redirect to="/login"/>}
          <Suspense fallback={<div>Loading...</div>}>
            <UnauthTemplate>
              <Switch>
                <Route path={`/login`}>
                  <Login/>
                </Route>
              </Switch>
            </UnauthTemplate>
          </Suspense>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
