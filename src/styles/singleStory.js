import styled from 'styled-components';
import { PlusCircle, Upload, Save, Trash2 } from 'react-feather';
import noImage from '../images/No-Image.png';
import TextareaAutosize from 'react-textarea-autosize';

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

export const SaveIcon = styled(Save)`
  width: 1em;
  height: auto;
  color: #fff;
  margin-right: 5px;
`;

export const Button = styled.button`
  border: none;
  background-color: #ff5959;
  border-radius: 0.5em;
  color: #fff;
  padding: 1em 2em;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.9;
  }
`;

export const InnerLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5em;
  margin: 1.5em 2.5em;
  @media (min-width: 50em) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const AddScene = styled.div`
  height: 20em;
  background-color: #fff;
  color: #e7e7e7;
  border: 3px dashed #e7e7e7;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: #4f9da6;
    cursor: pointer;
    color: #4f9da6;
  }
`;

export const AddIcon = styled(PlusCircle)`
  width: 2em;
  color: inherit;
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

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1em;
`;

export const UploadIcon = styled(Upload)`
  width: 1em;
  height: auto;
  color: #fff;
  margin-right: 5px;
`;

export const DeleteIcon = styled(Trash2)`
  width: 1em;
  height: auto;
  color: #fff;
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: #ff5959;
  border-radius: 0.5em;
  color: #fff;
  padding: 1em;
  cursor: pointer;
  display: none;
  margin-left: 5px;
  &:hover {
    opacity: 0.9;
  }
`;

export const ImageOverlay = styled.button`
  border: none;
  background-color: #4f9da6;
  border-radius: 0.5em;
  color: #fff;
  padding: 1em 2em;
  cursor: pointer;
  display: none;
  &:hover {
    opacity: 0.9;
  }
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
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
  &:hover ${ImageOverlay} {
    display: flex;
  }
  &:hover ${DeleteButton} {
    display: flex;
  }
`;

export const CoreSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: flex-start;
  width: 100%;
`;

export const FormGroup = styled.div`
  width: 100%;
`;

export const InputTitle = styled.div`
  text-align: left;
  padding-left: 1em;
  color: #4f9da6;
`;

export const Input = styled(TextareaAutosize)`
  font-size: 1.15em;
  color: #343a40;
  font-family: inherit;
  padding: 1em;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  font-size: 0.9em;
  background-color: ${(props) => props.theme.white} !important;
  box-sizing: border-box;
  &::placeholder {
    color: #e7e7e7;
    font-weight: 300;
  }
`;
