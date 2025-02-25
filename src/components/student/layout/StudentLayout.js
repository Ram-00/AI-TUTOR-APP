import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StudentHeader from './StudentHeader';
import StudentSidebar from './StudentSidebar';
import AIAssistant from '../../common/AIAssistant';
import { motion } from 'framer-motion';
import GlobalSearch from '../common/GlobalSearch';

const StudentLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <StudentHeader 
                drawerOpen={drawerOpen} 
                onDrawerToggle={handleDrawerToggle}
            />
            <StudentSidebar 
                open={drawerOpen} 
                onClose={handleDrawerToggle}
                drawerWidth={drawerWidth}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    flexGrow: 1,
                    padding: '24px',
                    marginTop: '64px',
                    backgroundColor: '#f5f5f9',
                    minHeight: '100vh',
                    width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
                    transition: 'width 0.3s ease-in-out'
                }}
            >
                <Outlet />
            </motion.div>
            <AIAssistant />
            <GlobalSearch />
        </Box>
    );
};

export default StudentLayout;
