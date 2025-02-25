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
    Person as PersonIcon,
    Settings as SettingsIcon,
    HelpOutline as HelpIcon,
    ExitToApp as LogoutIcon,
    School as SchoolIcon,
    AccountCircle,
    Help,
    Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import schoolLogo from '../../../images/school-logo1.png';
import { motion, AnimatePresence } from 'framer-motion';

const StudentHeader = ({ drawerOpen, onDrawerToggle }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/student-home/profile');
        handleClose();
    };

    const handleHelpClick = () => {
        navigate('/student-home/help');
        handleClose();
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
        handleClose();
    };

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
                    onClick={onDrawerToggle}
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <img 
                    src={schoolLogo} 
                    alt="School Logo" 
                    style={{ 
                        height: '40px',
                        marginRight: '16px',
                        borderRadius: '4px'
                    }} 
                />
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Sanghamitra Vidyalayam - Student Portal
                </Typography>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <IconButton
                        size="large"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </motion.div>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleProfileClick}>
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleHelpClick}>
                        <ListItemIcon>
                            <Help fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Help & Support</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default StudentHeader;
