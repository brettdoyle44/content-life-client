import styled from 'styled-components';
import { X, Upload } from 'react-feather';
import ReactQuill from 'react-quill';

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

export const GoBack = styled(X)`
  border-radius: 5px;
  padding: 5px;
  width: 1em;
  height: auto;
  background-color: #ff5f77;
  color: #fff;
  font-weight: 900;
`;

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: #fff;
  padding: 2em;
`;

export const AttachmentUpload = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  display: flex;
  justify-items: center;
  padding: 1em 1.5em;
  font-size: 1.25em;
  border: 3px solid #4f9da6;
  color: #4f9da6;
  border-radius: 0.5em;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.9;
  }
`;

export const UploadIcon = styled(Upload)`
  width: 1.15em;
  height: auto;
  color: #4f9da6;
  margin-right: 10px;
`;

export const QuillWrapper = styled(ReactQuill)`
  width: 100%;
  border-radius: 1em;
`;

export const FormWrapper = styled.div``;

export const Form = styled.form``;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 1em 1.5em;
  border: none;
  background-color: #4f9da6;
  width: 100%;
  color: #fff;
  border-radius: 0.5em;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export const TitleInput = styled.input`
  width: 100%;
  border-radius: 0.5em;
  border: 1px solid #d1d8e0;
  padding: 1em 1.5em;
  margin-bottom: 2%;
  ouline: 0px;
  &:focus {
    outline: none;
    border-color: #4f9da6;
  }
`;
