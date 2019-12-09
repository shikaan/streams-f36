import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// TODO: very suboptimal...
import '@contentful/forma-36-fcss/dist/styles.css';
import '@contentful/forma-36-react-components/dist/styles.css';
import './App.css'

import MainTemplate from "./components/MainTemplate/MainTemplate";
import Dashboard from "./components/Dashboard";
import UnauthTemplate from "./components/UnauthTemplate";
import Login from './components/Login/Login';

export default () => {
  const loggedIn = false;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app">
          <Redirect to="/app/dashboard" />
          <MainTemplate>
            <Switch>
              <Route path={`/app/dashboard`}>
                <Dashboard/>
              </Route>
            </Switch>
          </MainTemplate>
        </Route>
        <Route path="/">
          {loggedIn ? <Redirect to="/app" /> : <Redirect to="/login" /> }
          <UnauthTemplate>
            <Switch>
              <Route path={`/login`}>
                <Login/>
              </Route>
            </Switch>
          </UnauthTemplate>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
