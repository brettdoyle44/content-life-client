import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import moment from 'moment';
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
} from '../styles/editIdea';
import { API } from 'aws-amplify';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerInput = styled(DatePicker)`
  width: 100%;
  border-radius: 0.5em;
  border: 1px solid #d1d8e0;
  padding: 1em 1.5em;
  margin-bottom: 2%;
  ouline: 0px;
  &:focus {
    outline: none;
    border-color: #4f9da6;
  }
`;

export default function EditEvent() {
  const { id } = useParams();
  const history = useHistory();
  const [header, setHeader] = useState();
  const [details, setDetails] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    function loadEvent() {
      return API.get('core', `/events/${id}`);
    }

    async function onLoad() {
      try {
        const event = await loadEvent();
        setHeader(event.header);
        setDetails(event.details);
        setStartDate(moment(event.startDate).toDate());
        setEndDate(moment(event.endDate).toDate());
        setDoneLoading(true);
      } catch (e) {
        console.error(e);
      }
    }
    onLoad();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await saveEvent({
        header,
        details,
        startDate,
        endDate,
      });
      history.push(`/calendar`);
    } catch (e) {
      console.error(e);
    }
  }

  function saveEvent(event) {
    return API.put('core', `/events/${id}`, {
      body: event,
    });
  }

  return (
    <>
      {doneLoading && (
        <Layout>
          <Header>
            <Title>Edit your event</Title>
            <Link to={`/calendar`}>
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
                  <TitleInput
                    autoFocus
                    type="textarea"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Details"
                  />
                </FormGroup>
                <FormGroup style={{ paddingBottom: '1em' }}>
                  <DatePickerInput
                    selected={startDate}
                    placeholder="Start date here..."
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    style={{ borderRadius: '0.5em', border: 'solid #fff 1px' }}
                  />
                  <DatePickerInput
                    selected={endDate}
                    placeholder="End date here..."
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </FormGroup>
                <Button type="submit">Submit</Button>
              </Form>
            </FormWrapper>
          </FormLayout>
        </Layout>
      )}
    </>
  );
}
