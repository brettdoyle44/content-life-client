import React from 'react';

const initialState = {
  isAuthenticating: true,
  hasAuthenticated: false,
  active: 'home',
  activeNav: false,
  showIdeaModal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
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
    case 'SHOW_IDEA_MODAL':
      return { ...state, showIdeaModal: action.payload };
    default:
      throw new Error();
  }
};

const Context = React.createContext();

export { initialState, reducer, Context };
