import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {!isLoginPage && (
        <>
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: !isLoginPage ? '64px' : 0, // Height of header
          ml: !isLoginPage ? (isSidebarOpen ? '240px' : '0') : 0, // Width of sidebar
          transition: 'margin-left 0.3s ease',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          position: 'relative',
          padding: '20px'
        }}
      >
        {children}
        {!isLoginPage && <SearchBar />}
      </Box>
    </Box>
  );
};

export default Layout; 