import React from 'react';

const initialState = {
  audioUrl: null,
  isPlaying: false,
  isAuthenticating: true,
  hasAuthenticated: false,
  active: 'home',
  activeNav: false,
  showModal: false,
  signIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'PLAY_URL':
      return { ...state, isPlaying: true };
    case 'AUDIO_URL':
      return { ...state, audioUrl: action.payload };
    case 'PAUSE_URL':
      return initialState.isPlaying;
    case 'USER_HAS_AUTH':
      return { ...state, hasAuthenticated: true };
    case 'USER_IS_AUTH':
      return { ...state, isAuthenticating: false };
    case 'USER_LOGOUT':
      return { ...state, hasAuthenticated: false };
    case 'ACTIVE_NAV':
      return { ...state, active: action.payload };
    case 'SLIDE_NAV':
      return { ...state, activeNav: action.payload };
    case 'SHOW_MODAL':
      return { ...state, showModal: action.payload };
    case 'SIGN_IN':
      return { ...state, signIn: action.payload };
    default:
      throw new Error();
  }
};

const Context = React.createContext();

export { initialState, reducer, Context };
