import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { NewNote } from './pages/NewNote';

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
      <Route exact path="/notes/new">
        <NewNote />
      </Route>
      <Route path="*">404!</Route>
    </Switch>
  );
}
