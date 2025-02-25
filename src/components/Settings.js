import React from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Divider
} from '@mui/material';
import {
    Notifications as NotificationIcon,
    Brightness4 as DarkModeIcon,
    Language as LanguageIcon,
    Security as SecurityIcon
} from '@mui/icons-material';

const Settings = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom sx={{ color: '#FFB74D', mb: 4 }}>
                    Settings
                </Typography>
                
                <Paper sx={{ p: 2 }}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <NotificationIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Notifications" 
                                secondary="Enable/disable notifications"
                            />
                            <Switch defaultChecked />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <DarkModeIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Dark Mode" 
                                secondary="Toggle dark/light theme"
                            />
                            <Switch />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <LanguageIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Language" 
                                secondary="Change application language"
                            />
                            <Switch />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <SecurityIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Security" 
                                secondary="Manage security settings"
                            />
                            <Switch defaultChecked />
                        </ListItem>
                    </List>
                </Paper>
            </Container>
        </Box>
    );
};

export default Settings; 