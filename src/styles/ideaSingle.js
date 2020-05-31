import styled from 'styled-components';
import { Trash2, Edit } from 'react-feather';

export const Layout = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 2em;
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

export const Title = styled.div`
  font-size: 1.25em;
  font-weight: 900;
`;

export const InnerLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: #fff;
  padding: 2em;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content; space-between;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 1em 1.5em;
  border: none;
  background-color: #ff5f77;
  color: #fff;
  border-radius: 0.5em;
  cursor: pointer;
`;

export const TrashIcon = styled(Trash2)`
  width: 1em;
  height: auto;
  color: #fff;
  margin-right: 5px;
`;

export const EditIcon = styled(Edit)`
  width: 1em;
  height: auto;
  color: #fff;
  margin-right: 5px;
`;
