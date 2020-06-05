import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/store';
// import moment from 'moment';
// import ReactHtmlParser from 'react-html-parser';
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
} from '../styles/storyboard';
import { API } from 'aws-amplify';

export default function Ideas() {
  const [storyboards, setStoryboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { dispatch, store } = useContext(Context);

  function handleNewStory() {
    dispatch({ type: 'SHOW_STORY_MODAL', payload: true });
  }

  // useEffect(() => {
  //   async function onLoad() {
  //     if (!store.hasAuthenticated) {
  //       return;
  //     }
  //     try {
  //       const storyboards = await loadStoryboards();
  //       setStoryboards(storyboards);
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     setIsLoading(false);
  //   }

  //   onLoad();
  // }, [store.hasAuthenticated]);

  // function renderIdeaList(storyboards) {
  //   return storyboards.map((storyboard) =>
  //     storyboard !== [] ? (
  //       <Card key={storyboard.storyId}>
  //         <Link
  //           style={{ textDecoration: 'none', color: 'inherit' }}
  //           to={`/stories/${storyboard.storyId}`}
  //         >
  //           <InnerCardLayout>
  //             <TopSection></TopSection>
  //             <CoreSection>
  //               <CardTitle>{storyboard.header}</CardTitle>
  //             </CoreSection>
  //           </InnerCardLayout>
  //         </Link>
  //       </Card>
  //     ) : (
  //       <div>Create a new idea to start</div>
  //     )
  //   );
  // }

  // function loadStoryboards() {
  //   return API.get('core', '/stories');
  // }

  return (
    <Layout>
      <Header>
        <Title>Storyboards</Title>
        <Button onClick={handleNewStory}>Create New Storyboard</Button>
      </Header>
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CardLayout>{renderIdeaList(storyboards)}</CardLayout>
      )} */}
    </Layout>
  );
}
