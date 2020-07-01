import styled from 'styled-components';
import { ChevronDown, Settings, DollarSign, LogOut } from 'react-feather';

export const ProfileContainer = styled.div`
  display: grid;
  padding: 1.5em 1.25em;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  grid-column-gap: 1em;
  grid-template-areas:
    'pic name dropdown'
    'pic role dropdown';
`;
export const ProfilePic = styled.img`
  grid-area: pic;
  max-width: 2.5em;
  border-radius: 5em;
`;

export const ProfileName = styled.div`
  grid-area: name;
  margin-top: 2px;
  font-size: 0.9em;
`;

export const ProfileRole = styled.div`
  grid-area: role;
  font-size: 0.75em;
`;

export const DropdownButton = styled(ChevronDown)`
  grid-area: dropdown;
  align-self: center;
  border-radius: 5px;
  padding: 5px;
  width: 1em;
  height: auto;
  background-color: #f7f7ff;
  &:hover {
    cursor: pointer;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  margin-top: 3em;
  right: 11.5em;
  background-color: #fff;
  border-radius: 2em;
  display: grid;
  grid-gap: 1em;
  padding: 1em 0em;
  align-items: start;
  z-index: 995;
`;

export const DropdownContent = styled.div`
  display: ${(props) => (props.dropdownClicked ? 'none' : 'block')};
  position: absolute;
  padding-bottom: 0.5em;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropLink = styled.li`
  color: #000;
  padding: 0.5em 0 0.5em 1.5em;
  display: block;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: #4f9da6;
  }
`;

export const SettingsIcon = styled(Settings)`
  position: relative;
  width: 1em;
  top: 7px;
  padding-right: 0.5em;
`;

export const BillingIcon = styled(DollarSign)`
  position: relative;
  width: 1em;
  top: 7px;
  padding-right: 0.5em;
`;

export const LogoutIcon = styled(LogOut)`
  position: relative;
  width: 1em;
  top: 7px;
  padding-right: 0.5em;
`;
