import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Menu,
    MenuItem,
    Avatar,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Menu as MenuIcon,
    NotificationsOutlined as NotificationsIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    HelpOutline as HelpIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import schoolLogo from '../../../images/school-logo1.png';

const Header = ({ drawerOpen, onDrawerToggle }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        handleMenuClose();
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        {
            icon: <PersonIcon />,
            text: 'Profile Settings',
            onClick: () => handleNavigation('/faculty-home/profile'),
        },
        {
            icon: <SettingsIcon />,
            text: 'Preferences',
            onClick: () => handleNavigation('/faculty-home/preferences'),
        },
        {
            icon: <HelpIcon />,
            text: 'Help & Support',
            onClick: () => handleNavigation('/faculty-home/help'),
        },
        {
            icon: <LogoutIcon />,
            text: 'Logout',
            onClick: handleLogout,
            color: 'error'
        }
    ];

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#1a237e',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="toggle drawer"
                    edge="start"
                    onClick={onDrawerToggle}
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
                        width: 40,
                        marginRight: 2
                    }}
                />
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Sanghamitra Vidyalayam - Faculty Portal
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleProfileMenuOpen}
                        sx={{
                            padding: 0.5,
                            border: '2px solid white',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: 'white',
                                color: '#1a237e'
                            }}
                        >
                            <PersonIcon />
                        </Avatar>
                    </IconButton>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 220,
                            borderRadius: 2,
                            boxShadow: 3
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={item.text}
                            onClick={item.onClick}
                            sx={{
                                py: 1.5,
                                color: item.color === 'error' ? 'error.main' : 'inherit'
                            }}
                        >
                            <ListItemIcon sx={{ color: item.color === 'error' ? 'error.main' : 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
