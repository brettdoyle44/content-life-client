import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../context/store';
import { useHistory, Link } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { CircleSpinner } from 'react-spinners-kit';
import {
  Layout,
  Button,
  Header,
  Title,
  InnerLayout,
  TrashIcon,
  EditIcon,
  ButtonGroup,
} from '../styles/ideaSingle';

export default function AddIdea(props) {
  const history = useHistory();
  const [idea, setIdea] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { store } = useContext(Context);
  useEffect(() => {
    function loadIdea() {
      return API.get('core', `/ideas/${props.match.params.id}`);
    }

    async function onLoad() {
      if (!store.hasAuthenticated) {
        return;
      }
      try {
        const idea = await loadIdea();
        setIdea(idea);
      } catch (e) {
        console.error(e);
      }
    }

    onLoad();
  }, [props.match.params.id, store.hasAuthenticated]);

  function deleteNote() {
    return API.del('core', `/ideas/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm(
      'Are you sure you want to delete this idea?'
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      if (idea.attachments) {
        await Storage.vault.remove(idea.attachments.SS[0]);
        await deleteNote();
        history.push('/ideas');
      } else {
        await deleteNote();
        history.push('/ideas');
      }
    } catch (e) {
      console.error(e);
      setIsDeleting(false);
    }
  }

  return (
    <>
      {idea ? (
        <Layout>
          <Header>
            <Title>{idea.header}</Title>
            <ButtonGroup>
              <Link
                style={{ textDecoration: 'none' }}
                to={`/ideas/${props.match.params.id}/edit`}
              >
                <Button
                  style={{ backgroundColor: '#6478f8', marginRight: '1em' }}
                >
                  <EditIcon /> Edit
                </Button>
              </Link>
              <Button onClick={handleDelete}>
                {!isDeleting ? (
                  <>
                    <TrashIcon /> Delete
                  </>
                ) : (
                  <>
                    <CircleSpinner size={10} />{' '}
                    <span style={{ marginLeft: '5px' }}>Deleting...</span>
                  </>
                )}
              </Button>
            </ButtonGroup>
          </Header>
          <InnerLayout>{idea.details}</InnerLayout>
        </Layout>
      ) : (
        <Layout>
          <Header>...Loading</Header>
        </Layout>
      )}
    </>
  );
}
