import React, { useState, useContext } from 'react';
import { Context } from '../context/store';
// import { Link } from 'react-router-dom';
import {
  ProfileContainer,
  ProfilePic,
  ProfileRole,
  ProfileName,
  DropdownButton,
  Dropdown,
  DropdownContent,
  DropLink,
  SettingsIcon,
  BillingIcon,
  LogoutIcon,
} from '../styles/navprofile';
import { Auth } from 'aws-amplify';
import profilePic from '../images/avatar-1.jpg';

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const { dispatch } = useContext(Context);

  function toggleDropdown() {
    return setIsOpen(!isOpen);
  }

  async function handleLogout() {
    try {
      await Auth.signOut();
      dispatch({ type: 'USER_LOGOUT' });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <ProfileContainer>
        <ProfilePic src={profilePic} alt="profile picture" />
        <ProfileName>Brett D.</ProfileName>
        <ProfileRole>Owner</ProfileRole>
        <DropdownButton onClick={toggleDropdown} />
        {isOpen && (
          <Dropdown>
            <DropdownContent>
              <DropLink>
                <SettingsIcon />
                Settings
              </DropLink>
              <DropLink>
                <BillingIcon />
                Billing
              </DropLink>
              <DropLink onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </DropLink>
            </DropdownContent>
          </Dropdown>
        )}
      </ProfileContainer>
    </>
  );
}

export default ProfileDropdown;
