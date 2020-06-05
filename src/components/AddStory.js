import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/store';
import {
  FormLayout,
  FormHeader,
  FormGroup,
  FormWrapper,
  Form,
  Input,
  Button,
} from '../styles/addStoryboard';
import { API } from 'aws-amplify';

export default function AddStory() {
  const history = useHistory();
  const [header, setHeader] = useState('');
  const [details, setDetails] = useState('');

  const { dispatch } = useContext(Context);

  function validateForm() {
    return header.length > 0 && details.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const theStory = await createStoryboard({
        header,
        details,
      });
      dispatch({ type: 'SHOW_STORY_MODAL', payload: false });
      history.push(`/storyboard/${theStory.storyId}`);
    } catch (e) {
      alert(e.message);
    }
  }

  function createStoryboard(story) {
    return API.post('core', '/stories', {
      body: story,
    });
  }

  return (
    <FormLayout>
      <FormHeader>New Storyboard</FormHeader>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              placeholder="Title Here"
              name="header"
              type="textarea"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Description Here"
              name="details"
              type="textarea"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" disabled={!validateForm()}>
              Create Storyboard
            </Button>
          </FormGroup>
        </Form>
      </FormWrapper>
    </FormLayout>
  );
}
