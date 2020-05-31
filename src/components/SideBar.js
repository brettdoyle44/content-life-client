import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Context } from '../context/store';
import { Zap, BarChart2, Columns, Calendar } from 'react-feather';
import ProfileDropdown from './ProfileDropdown';
import {
  SideNav,
  SideNavClose,
  NavContainer,
  NavLink,
  LinkContainer,
  LinkWrapper,
  HeaderContainer,
  Header,
} from '../styles/sidenav';
import logo from '../images/CONTENT-LIFE-logo.png';

export default function Sidebar() {
  const { store, dispatch } = useContext(Context);

  function handleClick() {
    if (store.activeNav === false) {
      dispatch({ type: 'SLIDE_NAV', payload: true });
    } else {
      dispatch({ type: 'SLIDE_NAV', payload: false });
    }
  }

  return (
    <>
      <SideNav active={store.activeNav}>
        <SideNavClose onClick={handleClick}>
          <FaTimes onClick={handleClick} />
        </SideNavClose>
        <HeaderContainer>
          <Header src={logo} alt="logo" />
        </HeaderContainer>
        <ProfileDropdown />
        <NavContainer>
          <LinkContainer>
            <LinkWrapper
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: 'analytics' });
              }}
              activestyle={store.active === 'analytics' ? 'active' : 'none'}
            >
              <NavLink
                to="/analytics"
                activestyle={store.active === 'analytics' ? 'active' : 'none'}
              >
                <BarChart2
                  style={{
                    position: 'relative',
                    width: '1em',
                    top: '7px',
                    right: '0.75em',
                  }}
                />{' '}
                Analytics
              </NavLink>
            </LinkWrapper>
            <LinkWrapper
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: 'ideas' });
              }}
              activestyle={store.active === 'ideas' ? 'active' : 'none'}
            >
              <NavLink
                to="/ideas"
                activestyle={store.active === 'ideas' ? 'active' : 'none'}
              >
                <Zap
                  style={{
                    position: 'relative',
                    width: '1em',
                    top: '7px',
                    right: '0.75em',
                  }}
                />{' '}
                Ideas
              </NavLink>
            </LinkWrapper>
            <LinkWrapper
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: 'storyboard' });
              }}
              activestyle={store.active === 'storyboard' ? 'active' : 'none'}
            >
              <NavLink
                to="/storyboard"
                activestyle={store.active === 'storyboard' ? 'active' : 'none'}
              >
                <Columns
                  style={{
                    position: 'relative',
                    width: '1em',
                    top: '7px',
                    right: '0.75em',
                  }}
                />{' '}
                Storyboard
              </NavLink>
            </LinkWrapper>
            <LinkWrapper
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: 'calendar' });
              }}
              activestyle={store.active === 'calendar' ? 'active' : 'none'}
            >
              <NavLink
                to="/calendar"
                activestyle={store.active === 'calendar' ? 'active' : 'none'}
              >
                <Calendar
                  style={{
                    position: 'relative',
                    width: '1em',
                    top: '7px',
                    right: '0.75em',
                  }}
                />{' '}
                Calendar
              </NavLink>
            </LinkWrapper>
          </LinkContainer>
        </NavContainer>
      </SideNav>
    </>
  );
}
