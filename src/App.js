import React, { useReducer } from 'react';
import SideBar from './components/SideBar';
import { initialState, reducer, Context } from './context/store';
import { withRouter } from 'react-router-dom';
import './App.css';

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>
      <div>
        <SideBar />
      </div>
      <div
        style={{ background: '#f3f4f7', minHeight: '100vh', minWidth: '100vh' }}
      >
        Main
      </div>
    </Context.Provider>
  );
}

export default withRouter(App);
