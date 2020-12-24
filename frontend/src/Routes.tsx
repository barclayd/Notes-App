import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        Home
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
      <Route exact path="/sign-in">
        <SignIn />
      </Route>
      <Route path="*">404!</Route>
    </Switch>
  );
}
