import React, { useReducer, useEffect } from 'react';
// import SideBar from './components/SideBar';
// import Signup from './components/Signup';
// import Signin from './components/Signin';
import Routes from './routes/routes';
import { Auth } from 'aws-amplify';
import { initialState, reducer, Context } from './context/store';
import { withRouter } from 'react-router-dom';
import './App.css';

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      dispatch({ type: 'USER_HAS_AUTH' });
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    dispatch({ type: 'USER_IS_AUTH' });
  }
  return (
    <Context.Provider value={{ store, dispatch }}>
      {!store.isAuthenticating && <Routes />}
    </Context.Provider>
  );
}

export default withRouter(App);
