import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const SideNav = styled.aside`
  grid-area: sidenav;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 240px;
  position: fixed;
  overflow-y: auto;
  z-index: 2;
  text-align: left;
  background-color: #fff;
  transition: all 0.6s ease-in-out;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  ${(props) =>
    props.active
      ? css`
          transform: 'translateX(0)';
        `
      : css`
          transform: translateX(-245px);
        `}
  @media (min-width: 46.875em) {
    position: fixed;
    transform: translateX(0);
    box-shadow: none;
    background-color: #fff;
  }
`;

export const SideNavClose = styled.div`
  position: absolute;
  visibility: visible;
  top: 8px;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #ddd;
  @media (min-width: 46.875em) {
    visibility: hidden;
  }
`;

export const HeaderContainer = styled.div`
  margin-top: 1em;
  padding-left: 1.25em;
`;

export const Header = styled.img`
  width: 10em;
`;

export const NavContainer = styled.div``;

export const LinkContainer = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  font-weight: 500;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const LinkWrapper = styled.li`
  padding: 0.5em 0em 1em 2.5em;
  ${(props) =>
    props.activestyle === 'active' &&
    css`
        border-right: 3px solid #ef1860;
        color: #ef1860;
        background-color: #f7f7ff;
          }
        `}
  &:hover {
    color: #ef1860;
    background-color: #f7f7ff;
  }
`;

export const NavLink = styled(Link)`
  color: #595967;
  display: block;
  text-decoration: none;
  ${(props) =>
    props.activestyle === 'active' &&
    css`
        color: #ef1860;
        background-color: #f7f7ff;
          }
        `}
`;

// color: ${(props) => (props.activestyle ? '#ef1860' : '#01052d')};
//   text-decoration: none;
//   &:hover {
//     background: #f7f7ff;
//     color: ${(props) => (props.activestyle ? '#fff' : '#ef1860')};
//   }
//   &:focus {
//     color: #fff;
//     text-decoration: none;
//   }

// width: 100%;
//   padding: 0.5em 0em;
//   &:hover {
//     background: #f7f7ff;
//     cursor: pointer;
//   }
//   ${(props) =>
//     props.activestyle &&
//     css`
//       background: #f7f7ff;
//       color: #ef1860;
//       border: 3px solid #ef1860;
//       }
//     `}
