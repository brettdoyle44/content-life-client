import React, { useState, useContext } from 'react';
import { Context } from '../context/store';
import { Auth } from 'aws-amplify';
import {
  Layout,
  FormHeader,
  FormDesc,
  FormGroup,
  Form,
  FormWrapper,
  SignUpInput,
  FormLayout,
  ConfirmInput,
  Logo,
  Button,
} from '../styles/auth';
import logo from '../images/CONTENT-LIFE-logo.png';

export default function Signup(props) {
  const [newUser, setNewUser] = useState(null);
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { dispatch } = useContext(Context);

  function validateForm() {
    return (
      email.length > 0 && password.length > 0 && password === passwordConfirm
    );
  }

  function validateConfirmationForm() {
    return confirm.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      });
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(email, confirm);
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
        {newUser === null ? (
          <FormLayout>
            <FormWrapper>
              <FormHeader>Sign Up</FormHeader>
              <FormDesc>For a free account. You can upgrade later!</FormDesc>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <SignUpInput
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                  <SignUpInput
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                  <SignUpInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <SignUpInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <SignUpInput
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </FormGroup>
                <Button disabled={!validateForm()} type="submit">
                  Submit
                </Button>
              </Form>
            </FormWrapper>
          </FormLayout>
        ) : (
          <FormLayout>
            <FormWrapper>
              <FormHeader>Confirm Email</FormHeader>
              <FormDesc>Please check your email for the code.</FormDesc>
              <Form onSubmit={handleConfirmationSubmit}>
                <FormGroup>
                  <ConfirmInput
                    autoFocus
                    type="tel"
                    onChange={(e) => setConfirm(e.target.value)}
                    value={confirm}
                  />
                </FormGroup>
                <Button disabled={!validateConfirmationForm()} type="submit">
                  Submit
                </Button>
              </Form>
            </FormWrapper>
          </FormLayout>
        )}
      </Layout>
    </>
  );
}
