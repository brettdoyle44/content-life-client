import React, { useState, useRef } from 'react';
import { API } from 'aws-amplify';
import { s3Upload } from '../libs/awsLib';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import config from '../config';
import '../styles/quill-overwrite.css';
import {
  Layout,
  FormGroup,
  Form,
  FormWrapper,
  TitleInput,
  FormLayout,
  Button,
  Header,
  GoBack,
  Title,
  AttachmentUpload,
  UploadButton,
  UploadIcon,
  QuillWrapper,
} from '../styles/addIdea';

export default function AddIdea(props) {
  const file = useRef(null);
  const quillRef = useRef();
  const history = useHistory();
  const [header, setHeader] = useState('');
  const [details, setDetails] = useState('');
  const [targetDate, setTargetDate] = useState(moment());
  const [attachments, setAttachments] = useState('');
  const [focused, setFocused] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return header.length > 0 && details.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
    setAttachments(file.current.name);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
    // setIsLoading(true);
    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      setCollaborators(['']);
      await createIdea({
        header,
        details,
        targetDate,
        attachments: [attachment],
        collaborators,
      });
      history.push('/ideas');
    } catch (e) {
      alert(e.message);
    }
  }

  function handleUploadClick(e) {
    e.preventDefault();
    document.getElementById('hiddenFileInput').click();
  }

  function createIdea(idea) {
    return API.post('core', '/ideas', {
      body: idea,
    });
  }

  return (
    <>
      <Layout>
        <Header>
          <Title>Create an idea</Title>
          <Link to="/ideas">
            <GoBack />
          </Link>
        </Header>
        <FormLayout>
          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <TitleInput
                  autoFocus
                  type="textarea"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  placeholder="Title"
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5em' }}>
                <QuillWrapper
                  ref={quillRef}
                  theme="snow"
                  value={details}
                  placeholder={'Write something'}
                  onChange={setDetails}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <SingleDatePicker
                  date={targetDate}
                  onDateChange={setTargetDate}
                  focused={focused}
                  onFocusChange={() => setFocused(!focused)}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                  id="somerandomstring"
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <AttachmentUpload
                  name="file"
                  type="file"
                  id="hiddenFileInput"
                  onChange={handleFileChange}
                />
                <UploadButton onClick={handleUploadClick}>
                  <UploadIcon />
                  {attachments ? attachments : 'Upload file'}
                </UploadButton>
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
