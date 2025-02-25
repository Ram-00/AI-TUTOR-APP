import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Box
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Assignment as AssignmentIcon,
    Assessment as ResultsIcon,
    LibraryBooks as ResourcesIcon,
} from '@mui/icons-material';

const StudentSidebar = ({ open, drawerWidth }) => {
    const location = useLocation();

    const menuItems = [
        { 
            text: 'Dashboard', 
            icon: <DashboardIcon />, 
            path: '/student-home' 
        },
        { 
            text: 'Assignments', 
            icon: <AssignmentIcon />, 
            path: '/student-home/assignments' 
        },
        {
            text: 'Exam Results',
            icon: <ResultsIcon />,
            path: '/student-home/exam-results'
        },
        {
            text: 'Learning Resources',
            icon: <ResourcesIcon />,
            path: '/student-home/learning-resources'
        }
    ];

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    top: '64px',
                    height: 'calc(100% - 64px)',
                    transition: 'all 0.3s ease-in-out',
                    transform: open ? 'none' : 'translateX(-100%)',
                    visibility: open ? 'visible' : 'hidden',
                    backgroundColor: '#1a237e',
                    color: 'white',
                    borderRight: 'none'
                },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                sx={{
                                    minHeight: 48,
                                    px: 2.5,
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ 
                                    minWidth: 40, 
                                    color: 'white',
                                    opacity: open ? 1 : 0,
                                    transition: 'opacity 0.3s'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        transition: 'opacity 0.3s'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default StudentSidebar;
