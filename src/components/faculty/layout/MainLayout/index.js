import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';
import AIAssistant from '../../../common/AIAssistant';

const MainLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Header 
                drawerOpen={drawerOpen} 
                onDrawerToggle={handleDrawerToggle}
            />
            <Sidebar 
                open={drawerOpen} 
                onClose={handleDrawerToggle}
                drawerWidth={drawerWidth}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: '64px',
                    mb: '80px',
                    transition: 'margin-left 0.3s ease-in-out',
                    marginLeft: drawerOpen ? 0 : 0,
                    width: {
                        xs: '100%',
                        sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`
                    }
                }}
            >
                <Outlet />
            </Box>
            <SearchBar 
                drawerOpen={drawerOpen} 
                drawerWidth={drawerWidth} 
            />
            <AIAssistant />
        </Box>
    );
};

export default MainLayout; 