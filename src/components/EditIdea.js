import React, { useState, useContext, useRef, useEffect } from 'react';
import { Context } from '../context/store';
import { API, Storage } from 'aws-amplify';
import { s3Upload } from '../libs/awsLib';
import { Link, useParams, useHistory } from 'react-router-dom';
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
} from '../styles/editIdea';

export default function AddIdea(props) {
  const file = useRef(null);
  const quillRef = useRef();
  const { id } = useParams();
  const history = useHistory();
  const [header, setHeader] = useState('');
  const [details, setDetails] = useState('');
  const [targetDate, setTargetDate] = useState(moment());
  const [attachments, setAttachments] = useState('');
  const [currentAttachments, setCurrentAttachments] = useState('');
  const [currentShortname, setCurrentShortname] = useState('');
  const [focused, setFocused] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadIdea() {
      return API.get('core', `/ideas/${id}`);
    }

    async function onLoad() {
      try {
        const idea = await loadIdea();

        if (idea.attachments.SS[0]) {
          const currentAttachment = await Storage.vault.get(
            idea.attachments.SS[0]
          );
          setCurrentAttachments(currentAttachment);
        }
        setCurrentShortname(idea.attachments.SS[0]);
        setHeader(idea.header);
        setDetails(idea.details);
        setTargetDate(moment(idea.targetDate));
        setCollaborators(['']);
        setIsLoading(true);
      } catch (e) {
        console.error(e);
      }
    }

    onLoad();
  }, [id]);

  //   function formatFilename(str) {
  //     return str.replace(/^\w+-/, "");
  //   }

  function handleFileChange(event) {
    file.current = event.target.files[0];
    setAttachments(file.current.name);
  }

  function saveIdea(idea) {
    return API.put('core', `/ideas/${id}`, {
      body: idea,
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setTargetDate(moment(targetDate));

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
        setCurrentShortname(attachment);
      }
      await saveIdea({
        header,
        details,
        targetDate,
        attachments: [attachment] || [currentShortname],
        collaborators,
      });
      history.push(`/ideas/${id}`);
    } catch (e) {
      console.error(e);
    }
  }

  function handleUploadClick(e) {
    e.preventDefault();
    document.getElementById('hiddenFileInput').click();
  }

  return (
    <>
      {isLoading ? (
        <Layout>
          <Header>
            <Title>Edit your idea</Title>
            <Link to={`/ideas/${id}`}>
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
                  {currentAttachments && (
                    <img width="50" src={currentAttachments} alt="current" />
                  )}
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
                <Button type="submit">Submit</Button>
              </Form>
            </FormWrapper>
          </FormLayout>
        </Layout>
      ) : (
        <div style={{ gridArea: 'main' }}>...Loading</div>
      )}
    </>
  );
}
