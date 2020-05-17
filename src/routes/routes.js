import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Context } from '../context/store';
import Home from '../pages/Home';
import App from '../App';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

export default function Routes() {
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
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route
        exact
        path="/"
        render={() =>
          store.hasAuthenticated === true ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
      <Route component={App} />
    </Switch>
  );
}
