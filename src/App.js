import React, { useReducer } from 'react';
// import SideBar from './components/SideBar';
// import Signup from './components/Signup';
// import Signin from './components/Signin';
import Routes from './routes/routes';
import { initialState, reducer, Context } from './context/store';
import { withRouter } from 'react-router-dom';
import './App.css';

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>
      <Routes />
    </Context.Provider>
  );
}

export default withRouter(App);
