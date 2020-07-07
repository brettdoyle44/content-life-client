import styled from 'styled-components';
import noImage from '../images/No-Image.png';
import { Trash2 } from 'react-feather';

export const Layout = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: 1.5em 2em;
`;

export const Title = styled.div`
  font-size: 1.25em;
  font-weight: 900;
`;

export const Button = styled.button`
  border: none;
  background-color: #ff5959;
  border-radius: 0.5em;
  color: #fff;
  padding: 1em 1.5em;
  width: 15em;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5em;
  margin: 1.5em 2.5em;
  @media (min-width: 50em) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.white};
  border-radius: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

export const InnerCardLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageOverlay = styled.div`
  display: none;
  width: 100%;
  height: 15em;
  border-radius: 0.5em 0.5em 0 0;
  background-color: rgba(79, 157, 168, 0.5);
`;

export const ExampleImage = styled.div`
  flex-grow: 1;
  height: 15em;
  background: url(${(props) => (props.img ? props.img : noImage)});
  border-radius: 0.5em 0.5em 0 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover ${ImageOverlay} {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 700;
    font-size: 1em;
  }
`;

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1em;
`;

export const CoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em 1.5em;
`;

export const CardTitle = styled.div`
  font-size: 1.15em;
  color: #343a40;
  font-weight: 600;
  padding-bottom: 1em;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CardDesc = styled.p`
  text-align: left;
  color: #6c757d;
  line-height: 1.5em;
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: #fff;
  border-radius: 0.5em;
  color: #ff5959;
  padding: 1em;
  cursor: pointer;
  &:hover {
    background-color: #ff5959;
    color: #fff;
  }
`;

export const DeleteIcon = styled(Trash2)`
  width: 1em;
  height: auto;
  color: inherit;
`;
