import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f4f7;
  min-height: 100vh;
  min-width: 100vh;
  align-items: center;
`;

export const Logo = styled.img`
  width: 10em;
  padding: 1em 0;
`;

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: #fff;
  padding: 2em;
  max-width: 35em;
`;

export const FormHeader = styled.h3`
  text-align: center;
`;

export const FormDesc = styled.p`
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

export const Button = styled.button`
  padding: 1em 1.5em;
  border: none;
  background-color: #ef1860;
  width: 100%;
  color: #fff;
  border-radius: 0.5em;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const SignUpInput = styled.input`
  width: 40%;
  border-radius: 0.5em;
  border: 1px solid #d1d8e0;
  padding: 1em 1.5em;
  margin-bottom: 2%;
  ouline: 0px;
  &:focus {
    outline: none;
    border-color: #ef1860;
  }
  &:nth-child(3n) {
    width: 100%;
  }
  &:nth-child(4n) {
    width: 100%;
  }
  &:nth-child(5n) {
    width: 100%;
  }
`;

export const SignInInput = styled.input`
  width: 100%;
  border-radius: 0.5em;
  border: 1px solid #d1d8e0;
  padding: 1em 1.5em;
  margin-bottom: 2%;
  ouline: 0px;
  &:focus {
    outline: none;
    border-color: #ef1860;
  }
`;

export const ConfirmInput = styled.input`
  border-radius: 0.5em;
  border: 1px solid #d1d8e0;
  padding: 1em 1.5em;
  margin-bottom: 2%;
  ouline: 0px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #ef1860;
  }
`;
