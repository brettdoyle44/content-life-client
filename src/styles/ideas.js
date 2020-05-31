import styled from 'styled-components';
import { Paperclip, Calendar } from 'react-feather';

export const Layout = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: 1.5em 2em;
`;

export const Title = styled.div`
  font-size: 1.25em;
  font-weight: 900;
`;

export const Button = styled.button`
  border: none;
  background-color: #ef1860;
  border-radius: 0.5em;
  color: #fff;
  padding: 1em 1.5em;
  width: 15em;
  cursor: pointer;
`;

export const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5em;
  margin: 1.5em 2.5em;
  @media (min-width: 50em) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-flow: row wrap;
`;

export const InnerCardLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em 1.5em 0.65em 1.5em;
`;

export const Platform = styled.div`
  font-size: 0.85em;
  color: #43d39e;
`;

export const Status = styled.div`
  color: #fff;
  background-color: #43d39e;
  font-size: 0.75em;
  padding: 0.5em;
  border-radius: 0.25em;
`;

export const CoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1.5em;
`;

export const CardTitle = styled.div`
  font-size: 1.15em;
  color: #343a40;
  font-weight: 600;
  padding-bottom: 1em;
`;

export const CardDesc = styled.p`
  text-align: left;
  color: #6c757d;
  line-height: 1.5em;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
  align-items: flex-end;
  margin-top: auto;
`;

export const Attachments = styled.div`
  display: flex;
  align-items: center;
`;

export const TargetDate = styled.div`
  display: flex;
  margin-top: 2px;
  align-items: center;
`;

export const CalendarIcon = styled(Calendar)`
  width: 1em;
  margin-right: 5px;
  margin-bottom: 2px;
  height: auto;
`;

export const PaperclipIcon = styled(Paperclip)`
  width: 1em;
  margin-right: 5px;
  height: auto;
`;

export const Collaborators = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 5em;
  background-color: grey;
`;
