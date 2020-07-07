import React, { useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { XCircle, Trash2, Edit } from 'react-feather';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

export const PopOverWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  border-radius: 0.5em;
  display: none;
  padding: 1em;
  width: 20em;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  flex-direction: column;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseIcon = styled(XCircle)`
  border-radius: 5px;
  padding: 0.5em;
  width: 1em;
  height: auto;
  color: #6c757d;
  font-weight: 900;
  &:hover {
    background-color: #f7f7ff;
    color: #4f9da6;
    cursor: pointer;
  }
`;
export const DeleteIcon = styled(Trash2)`
  border-radius: 5px;
  padding: 0.5em;
  width: 1em;
  height: auto;
  color: #6c757d;
  font-weight: 900;
  &:hover {
    background-color: #f7f7ff;
    color: #4f9da6;
    cursor: pointer;
  }
`;

export const EditIcon = styled(Edit)`
  border-radius: 5px;
  padding: 0.5em;
  width: 1em;
  height: auto;
  color: #6c757d;
  font-weight: 900;
  &:hover {
    background-color: #f7f7ff;
    color: #4f9da6;
    cursor: pointer;
  }
`;

export const CoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.div`
  font-size: 1.25em;
`;

export const Details = styled.div``;

export const StartDate = styled.div``;

export const EndDate = styled.div``;

export default function Event({ title, details, startdate, enddate, id }) {
  const popOver = useRef(null);
  const history = useHistory();

  //   const [isDeleting, setIsDeleting] = useState();

  //   useEffect(() => {
  //     document.addEventListener('mousedown', handleClose);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClose);
  //     };
  //   }, []);

  async function handleClose(e) {
    e.preventDefault();
    try {
      popOver.current.style.display = 'none';
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm(
      'Are you sure you want to delete this idea?'
    );
    if (!confirmed) {
      return;
    }
    // setIsDeleting(true);
    try {
      await deleteEvent();
      history.push('/calendar');
    } catch (e) {
      console.error(e);
      //   setIsDeleting(false);
    }
  }

  function deleteEvent() {
    return API.del('core', `/events/${id}`);
  }

  return (
    <PopOverWrapper ref={popOver} id="only-one">
      <HeaderSection>
        <Link style={{ textDecoration: 'none' }} to={`/events/${id}`}>
          <EditIcon
            title={title}
            details={details}
            startdate={startdate}
            enddate={enddate}
          />
        </Link>{' '}
        <DeleteIcon onClick={handleDelete} />{' '}
        <CloseIcon onClick={handleClose} />
      </HeaderSection>
      <CoreSection>
        <Title>{title}</Title>
        <Details>{details}</Details>
        <StartDate>
          {moment(startdate).format('MMMM Do YYYY, h:mm:ss')}
        </StartDate>
        <EndDate>{moment(enddate).format('MMMM Do YYYY, h:mm:ss')}</EndDate>
      </CoreSection>
    </PopOverWrapper>
  );
}
