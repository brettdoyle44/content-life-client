import styled from 'styled-components';
import { ChevronDown } from 'react-feather';

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
