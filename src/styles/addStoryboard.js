import styled from 'styled-components';

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: #fff;
  padding: 2em;
  width: 20em;
  @media (min-width: 50em) {
    width: 40em;
  }
`;

export const FormHeader = styled.h3`
  text-align: center;
  padding-bottom: 1em;
`;

export const FormWrapper = styled.div``;

export const Form = styled.form``;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Input = styled.input`
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

export const Button = styled.button`
  padding: 1em 1.5em;
  border: none;
  background-color: #4f9da6;
  width: 100%;
  color: #fff;
  border-radius: 0.5em;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    opacity: 0.9;
  }
`;
