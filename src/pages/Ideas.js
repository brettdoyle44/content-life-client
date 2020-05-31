import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/store';
import moment from 'moment';
// import ReactHtmlParser from 'react-html-parser';
import {
  Layout,
  Header,
  Title,
  Button,
  CardLayout,
  Card,
  TopSection,
  Platform,
  Status,
  CoreSection,
  CardTitle,
  CardDesc,
  BottomSection,
  InnerCardLayout,
  TargetDate,
  Attachments,
  CalendarIcon,
  PaperclipIcon,
} from '../styles/ideas';
import { API } from 'aws-amplify';

export default function Ideas() {
  const MAX_LENGTH = 50;
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { store } = useContext(Context);

  useEffect(() => {
    async function onLoad() {
      if (!store.hasAuthenticated) {
        return;
      }
      try {
        const ideas = await loadIdeas();
        setIdeas(ideas);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [store.hasAuthenticated]);

  function renderIdeaList(ideas) {
    return ideas.map((idea) =>
      idea !== [] ? (
        <Card key={idea.ideaId}>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`/ideas/${idea.ideaId}`}
          >
            <InnerCardLayout>
              <TopSection>
                <Platform>YOUTUBE</Platform>
                <Status>Launched</Status>
              </TopSection>
              <CoreSection>
                <CardTitle>{idea.header}</CardTitle>
                <CardDesc>
                  {idea.details
                    .replace(/<\/?[^>]+(>|$)/g, '')
                    .substring(0, MAX_LENGTH)}
                  ...
                </CardDesc>
              </CoreSection>

              <BottomSection>
                <Attachments>
                  <PaperclipIcon />
                  {idea.attachments.SS.length}
                </Attachments>
                <TargetDate>
                  <CalendarIcon />
                  {moment(idea.targetDate).format('DD MMM')}
                </TargetDate>
              </BottomSection>
            </InnerCardLayout>
          </Link>
        </Card>
      ) : (
        <div>Create a new idea to start</div>
      )
    );
  }

  function loadIdeas() {
    return API.get('core', '/ideas');
  }

  return (
    <Layout>
      <Header>
        <Title>Ideas</Title>
        <Link to="/addidea">
          <Button>Create New Idea</Button>
        </Link>
      </Header>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CardLayout>{renderIdeaList(ideas)}</CardLayout>
      )}
    </Layout>
  );
}
