import React, { useState, useContext } from 'react';
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
import moment from 'moment';
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

export default function AddEvent() {
  const [header, setHeader] = useState('');
  const [details, setDetails] = useState('');
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().valueOf());

  const { dispatch } = useContext(Context);

  function validateForm() {
    return header.length > 0 && details.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await createEvent({
        header,
        details,
        startDate,
        endDate,
      });
      dispatch({ type: 'SHOW_EVENT_MODAL', payload: false });
    } catch (e) {
      alert(e.message);
    }
  }

  function createEvent(event) {
    return API.post('core', '/events', {
      body: event,
    });
  }

  return (
    <FormLayout>
      <FormHeader>New Event</FormHeader>
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
          <FormGroup>
            <Button type="submit" disabled={!validateForm()}>
              Add Event
            </Button>
          </FormGroup>
        </Form>
      </FormWrapper>
    </FormLayout>
  );
}
