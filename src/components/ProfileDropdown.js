import React from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronDown } from 'react-feather';
import {
  ProfileContainer,
  ProfilePic,
  ProfileRole,
  ProfileName,
  DropdownButton,
} from '../styles/navprofile';
import profilePic from '../images/avatar-1.jpg';

function ProfileDropdown() {
  //   const [dropdownOpen, setdropdownOpen] = useState(false);

  /*:: toggleDropdown: () => void */
  //   function toggleDropdown() {
  //     setdropdownOpen(!dropdownOpen);
  //   }

  //   const menuItems = ['My Account', 'Settings', 'Support', 'Logout'];

  return (
    <>
      <ProfileContainer>
        <ProfilePic src={profilePic} alt="profile picture" />
        <ProfileName>Brett D.</ProfileName>
        <ProfileRole>Owner</ProfileRole>
        <DropdownButton />
      </ProfileContainer>
    </>
  );
}

export default ProfileDropdown;
