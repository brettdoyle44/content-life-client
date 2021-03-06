import React, { useReducer, useEffect, useRef } from 'react';
// import SideBar from './components/SideBar';
// import Signup from './components/Signup';
import AddStory from './components/AddStory';
import AddEvent from './components/AddEvent';
import Modal from 'react-modal';
import Signin from './components/Signin';
import Routes from './routes/routes';
import { Auth } from 'aws-amplify';
import { initialState, reducer, Context } from './context/store';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/SideBar';
import { GlobalStyle, lightTheme } from './styles/core';
import { ThemeProvider } from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-quill/dist/quill.snow.css';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas: 'main';
  height: 100vh;
  @media (min-width: 46.875em) {
    grid-template-columns: 240px 1fr;
    grid-template-areas: 'sidenav main';
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: '999',
  },
};

function App() {
  const isMounted = useRef(true);
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isMounted.current) {
      onLoad();
      Modal.setAppElement('body');
    }
    return () => (isMounted.current = true);
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

  function renderSignIn() {
    return <Signin />;
  }

  function renderDashboard() {
    return (
      <Layout>
        <Sidebar />
        <Routes />
      </Layout>
    );
  }

  function handleStoryModalClose() {
    dispatch({ type: 'SHOW_STORY_MODAL', payload: false });
  }

  function handleEventModalClose() {
    dispatch({ type: 'SHOW_EVENT_MODAL', payload: false });
  }

  return (
    <Context.Provider value={{ store, dispatch }}>
      <ThemeProvider theme={lightTheme}>
        <>
          {!store.isAuthenticating && (
            <>{store.hasAuthenticated ? renderDashboard() : renderSignIn()}</>
          )}
        </>
        <Modal
          isOpen={store.showStoryModal}
          onRequestClose={handleStoryModalClose}
          style={customStyles}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
        >
          <AddStory />
        </Modal>
        <Modal
          isOpen={store.showEventModal}
          onRequestClose={handleEventModalClose}
          style={customStyles}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
        >
          <AddEvent />
        </Modal>
        <GlobalStyle />
      </ThemeProvider>
    </Context.Provider>
  );
}

export default withRouter(App);
