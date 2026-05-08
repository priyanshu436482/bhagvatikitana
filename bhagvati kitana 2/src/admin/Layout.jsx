import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
