import React, { useContext, useState, useEffect, useRef } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import { PlusCircle } from 'react-feather';
import { Context } from '../context/store';
import FullCalendar from '@fullcalendar/react';
// import BootstrapTheme from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { API } from 'aws-amplify';
import Event from '../components/Event';
import '../styles/cal-theme-overwrite.css';

// const localizer = momentLocalizer(moment);

const Layout = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em 2em;
`;

export const Title = styled.div`
  font-size: 1.25em;
  font-weight: 900;
`;

export const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 0.5em;
  color: ${(props) => props.theme.white};
  padding: 1em 2em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.9;
  }
`;

export const PlusIcon = styled(PlusCircle)`
  width: 1em;
  height: auto;
  color: ${(props) => props.theme.white};
  margin-right: 10px;
`;

export const CalendarLayout = styled.div`
  background-color: ${(props) => props.theme.white};
  margin: 1em 2em;
  border-radius: 0.5em;
  padding: 1em 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const PopOver = styled.div`
  background-color: ${(props) => props.theme.white};
  border-radius: 0.5em;
  display: none;
  padding: 1em 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export default function MainCalendar() {
  const clickedEvent = useRef(null);
  const eventElement = useRef(null);
  const isMounted = useRef(true);
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});

  const { store, dispatch } = useContext(Context);

  function handleAddEvent() {
    dispatch({ type: 'SHOW_EVENT_MODAL', payload: true });
  }

  useEffect(() => {
    if (isMounted.current) {
      function loadEvents() {
        return API.get('core', '/events');
      }

      function objMap(eventObj) {
        return eventObj.map((event, idx) => {
          return {
            id: event.eventId,
            title: event.header,
            details: event.details,
            start: event.startDate,
            end: event.endDate,
            idx: idx,
          };
        });
      }

      async function onLoad() {
        if (!store.hasAuthenticated) {
          return;
        }
        try {
          const theEvents = await loadEvents();
          const updatedEvents = await objMap(theEvents);
          setEvents(updatedEvents);
        } catch (e) {
          console.error(e);
        }
      }

      onLoad();
    }
    return () => (isMounted.current = false);
  }, [store.hasAuthenticated]);

  async function handleEventClick(info) {
    info.jsEvent.preventDefault();
    eventElement.current = info.el;
    clickedEvent.current = info.event;
    const theEvent = await events.find(
      ({ id }) => id === clickedEvent.current.id
    );
    setCurrentEvent(theEvent);
    const coords = await eventElement.current.getBoundingClientRect();
    const popover = document.getElementById('only-one');
    popover.style.position = 'absolute';
    popover.style.left = coords.left - 50 + 'px';
    popover.style.top = coords.top + 'px';
    popover.style.display = 'flex';
    popover.style.zIndex = '99999';
  }

  return (
    <Layout>
      <Header>
        <Title>Calendar</Title>
        <Button onClick={handleAddEvent}>
          <PlusIcon />
          Add New Event
        </Button>
      </Header>
      <CalendarLayout>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          slotDuration="00:15:00"
          themeSystem="standard"
          handleWindowResize={true}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            list: 'List',
            prev: 'Prev',
            next: 'Next',
          }}
          headerToolbar={{
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          droppable={true}
          editable={true}
          selectable={true}
          eventClick={handleEventClick}
          events={events}
        />
        <Event
          title={currentEvent.title}
          details={currentEvent.details}
          startdate={currentEvent.start}
          enddate={currentEvent.end}
          id={currentEvent.id}
        />
      </CalendarLayout>
    </Layout>
  );
}
