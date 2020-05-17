import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Context } from '../context/store';

export default function AppRoutes() {
  const { store } = useContext(Context);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        store.hasAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
  return (
    <Switch>
      <PrivateRoute exact path="/analytics" component={Analytics} />
      <PrivateRoute exact path="/ideas" component={Ideas} />
      <PrivateRoute exact path="/storyboard" component={Storyboard} />
      <PrivateRoute exact path="/calendar" component={Calendar} />
    </Switch>
  );
}
