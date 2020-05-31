import React from 'react';
import Sidebar from '../components/SideBar';
import AppRoutes from '../routes/appRoutes';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas: 'main';
  height: 100vh;
  @media (min-width: 46.875em) {
    grid-template-columns: 240px 1fr;
    grid-template-areas: 'sidenav main';
  }
`;

export default function Home() {
  return (
    <Layout>
      <Sidebar />
      <AppRoutes />
    </Layout>
  );
}
