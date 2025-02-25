import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Box,
    Divider,
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    Description as PaperIcon,
    Create as QuestionIcon,
    School as SynopsisIcon,
    Assignment as HomeworkIcon,
    AutoAwesome as AIIcon,
    Notifications as NotificationIcon,
    Settings as PreferencesIcon,
    HelpOutline as HelpIcon,
} from '@mui/icons-material';
import schoolLogo from '../images/school-logo1.png';

const drawerWidth = 280;

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/login');
    };

    const menuItems = [
        { 
            icon: <DashboardIcon />, 
            text: 'Dashboard', 
            path: '/faculty-home',
            active: location.pathname === '/faculty-home'
        },
        { 
            icon: <PaperIcon />, 
            text: 'Paper Evaluation', 
            path: '/paper-evaluation',
            active: location.pathname === '/paper-evaluation'
        },
        { 
            icon: <QuestionIcon />, 
            text: 'Question Paper Generation', 
            path: '/question-paper-generation',
            active: location.pathname === '/question-paper-generation'
        },
        { 
            icon: <SynopsisIcon />, 
            text: 'Synopsis for Teachers', 
            path: '/synopsis-for-teachers',
            active: location.pathname === '/synopsis-for-teachers'
        },
        { 
            icon: <HomeworkIcon />, 
            text: 'Homework Correction', 
            path: '/homework-correction',
            active: location.pathname === '/homework-correction'
        },
        { 
            icon: <AIIcon />, 
            text: 'AI-Driven Lesson Planning', 
            path: '/ai-lesson-planning',
            active: location.pathname === '/ai-lesson-planning'
        }
    ];

    return (
        <>
            <AppBar 
                position="fixed" 
                sx={{ 
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: '#1a237e',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box 
                        component="img"
                        src={schoolLogo}
                        alt="School Logo"
                        sx={{ 
                            height: 40,
                            width: 'auto',
                            mr: 2
                        }}
                    />

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sanghamitra Vidyalayam
                    </Typography>

                    <IconButton
                        size="large"
                        color="inherit"
                    >
                        <Badge badgeContent={3} color="error">
                            <NotificationIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        size="large"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={{ bgcolor: '#1565c0' }}>
                            {user?.name?.charAt(0) || 'U'}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiMenuItem-root': {
                                    px: 2,
                                    py: 1,
                                    borderRadius: 1,
                                    margin: '4px 8px',
                                },
                                '& .MuiMenuItem-root:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                            <ListItemIcon>
                                <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Profile Settings</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); navigate('/preferences'); }}>
                            <ListItemIcon>
                                <PreferencesIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Preferences</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); navigate('/help'); }}>
                            <ListItemIcon>
                                <HelpIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Help & Support</ListItemText>
                        </MenuItem>
                        <Divider sx={{ my: 1 }} />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={sidebarOpen ? "permanent" : "temporary"}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                        width: drawerWidth, 
                        boxSizing: 'border-box',
                        backgroundColor: '#1a237e',
                        color: 'white',
                        borderRight: 'none',
                        mt: '64px', // height of AppBar
                        height: 'calc(100vh - 64px)',
                    },
                }}
            >
                <List sx={{ mt: 2 }}>
                    {menuItems.map((item, index) => (
                        <ListItem 
                            key={index} 
                            disablePadding
                            onClick={() => navigate(item.path)}
                            sx={{ 
                                backgroundColor: item.active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.12)'
                                }
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Navigation;
