import React, { useState, useContext } from 'react';
import { Context } from '../context/store';
import { Auth } from 'aws-amplify';
import {
  Layout,
  FormHeader,
  FormGroup,
  Form,
  FormWrapper,
  SignInInput,
  FormLayout,
  Logo,
  Button,
} from '../styles/auth';
import logo from '../images/CONTENT-LIFE-logo.png';

export default function Signin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = useContext(Context);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await Auth.signIn(email, password);
      dispatch({ type: 'USER_HAS_AUTH' });
      props.history.push('/home');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <>
      <Layout>
        <Logo src={logo} alt="content life" />
        <FormLayout>
          <FormWrapper>
            <FormHeader>Sign In</FormHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <SignInInput
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <SignInInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <Button disabled={!validateForm()} type="submit">
                Submit
              </Button>
            </Form>
          </FormWrapper>
        </FormLayout>
      </Layout>
    </>
  );
}
