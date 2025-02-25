import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Assignment as PaperIcon,
    Quiz as QuestionIcon,
    MenuBook as SynopsisIcon,
    Grade as HomeworkIcon,
    AutoStories as LessonIcon
} from '@mui/icons-material';

const menuItems = [
    { 
        text: 'Dashboard', 
        icon: <DashboardIcon />, 
        path: '/faculty-home' 
    },
    { 
        text: 'Paper Evaluation', 
        icon: <PaperIcon />, 
        path: '/faculty-home/paper-evaluation' 
    },
    {
        text: 'Question Paper Generation',
        icon: <QuestionIcon />,
        path: '/faculty-home/question-generation'
    },
    {
        text: 'Synopsis for Teachers',
        icon: <SynopsisIcon />,
        path: '/faculty-home/synopsis'
    },
    {
        text: 'Homework Correction',
        icon: <HomeworkIcon />,
        path: '/faculty-home/homework'
    },
    {
        text: 'AI-Driven Lesson Planning',
        icon: <LessonIcon />,
        path: '/faculty-home/lesson-planning'
    }
];

const Sidebar = ({ open, onClose, drawerWidth }) => {
    const location = useLocation();

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
                    overflowX: 'hidden',
                    backgroundColor: '#1a237e',
                    color: 'white',
                    borderRight: 'none'
                },
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar; 