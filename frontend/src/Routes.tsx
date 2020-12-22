import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        Home
      </Route>
      <Route exact path="/sign-up">
        Hello you
      </Route>
      <Route path="*">404!</Route>
    </Switch>
  );
}
