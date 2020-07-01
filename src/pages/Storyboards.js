import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/store';
import moment from 'moment';
import {
  Layout,
  Header,
  Title,
  Button,
  CardLayout,
  Card,
  TopSection,
  CoreSection,
  CardTitle,
  InnerCardLayout,
  ExampleImage,
  CardDesc,
  BottomSection,
  DeleteButton,
  DeleteIcon,
  ImageOverlay,
} from '../styles/storyboard';
import { CircleSpinner } from 'react-spinners-kit';
import { API } from 'aws-amplify';

export default function Ideas() {
  const deleteItem = useRef(null);
  const [storyboards, setStoryboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const { dispatch, store } = useContext(Context);

  function handleNewStory() {
    dispatch({ type: 'SHOW_STORY_MODAL', payload: true });
  }

  useEffect(() => {
    async function onLoad() {
      if (!store.hasAuthenticated) {
        return;
      }
      try {
        const storyboards = await loadStoryboards();
        setStoryboards(storyboards);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }
    onLoad();
  }, [store.hasAuthenticated]);

  function deleteStory(id) {
    return API.del('core', `/story/${id}`);
  }

  function reRenderScenes(id) {
    const updatedStories = storyboards.filter(
      (storyboard) => storyboard.storyId !== id
    );
    setStoryboards(updatedStories);
  }

  async function handleDelete(e, params) {
    e.preventDefault();
    deleteItem.current = params;
    console.log(deleteItem.current.storyboard.storyId);
    const confirmed = window.confirm(
      'Are you sure you want to delete this idea?'
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteStory(deleteItem.current.storyboard.storyId);
      reRenderScenes(deleteItem.current.storyboard.storyId);
      setIsDeleting(false);
    } catch (e) {
      console.error(e);
      setIsDeleting(false);
    }
  }

  function renderStoryList(storyboards) {
    if (storyboards !== []) {
      return storyboards.map((storyboard) => (
        <Card key={storyboard.storyId}>
          <InnerCardLayout>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to={{
                pathname: `/storyboard/${storyboard.storyId}`,
                state: {
                  title: storyboard.header,
                },
              }}
            >
              <TopSection>
                <ExampleImage img={storyboard.image}>
                  <ImageOverlay>View Storyboard</ImageOverlay>
                </ExampleImage>
              </TopSection>
            </Link>
            <CoreSection>
              <CardTitle>{storyboard.header}</CardTitle>
              <BottomSection>
                <CardDesc>
                  Created: {moment(storyboard.createdAt).format('MMMM Do YYYY')}
                </CardDesc>
                <DeleteButton
                  onClick={(e) => {
                    handleDelete(e, { storyboard });
                  }}
                >
                  {!isDeleting ? (
                    <>
                      <DeleteIcon />
                    </>
                  ) : (
                    <>
                      <CircleSpinner size={10} />
                    </>
                  )}
                </DeleteButton>
              </BottomSection>
            </CoreSection>
          </InnerCardLayout>
        </Card>
      ));
    } else {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="hehehehe"
        >
          Create a new idea to start
        </div>
      );
    }
  }

  function loadStoryboards() {
    return API.get('core', '/stories');
  }

  return (
    <Layout>
      <Header>
        <Title>Storyboards</Title>
        <Button onClick={handleNewStory}>Create New Storyboard</Button>
      </Header>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CardLayout>{renderStoryList(storyboards)}</CardLayout>
      )}
    </Layout>
  );
}
