import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { NewNote } from './pages/NewNote';
import { Notes } from './pages/Notes';
import { EditNote } from './pages/EditNote';
import { UnauthenticatedRoute } from './routes/UnathenticatedRoute';
import { AuthenticatedRoute } from './routes/AuthenticatedRoute';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Notes />
      </Route>
      <UnauthenticatedRoute exact path="/sign-up">
        <SignUp />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/sign-in">
        <SignIn />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/new">
        <NewNote />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/:id">
        <EditNote />
      </AuthenticatedRoute>
      <Route path="*">404!</Route>
    </Switch>
  );
}
