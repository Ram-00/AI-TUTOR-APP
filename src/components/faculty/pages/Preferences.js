import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Switch,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider
} from '@mui/material';

const Preferences = () => {
    const preferences = [
        {
            title: 'Email Notifications',
            description: 'Receive email notifications for important updates',
            defaultChecked: true
        },
        {
            title: 'Desktop Notifications',
            description: 'Show desktop notifications when browser is open',
            defaultChecked: true
        },
        {
            title: 'Dark Mode',
            description: 'Switch between light and dark theme',
            defaultChecked: false
        },
        {
            title: 'Sound Effects',
            description: 'Play sound on notifications',
            defaultChecked: true
        }
    ];

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 4 }}>Preferences</Typography>
            <Paper sx={{ borderRadius: 2 }}>
                <List>
                    {preferences.map((pref, index) => (
                        <React.Fragment key={pref.title}>
                            <ListItem sx={{ py: 2 }}>
                                <ListItemText
                                    primary={pref.title}
                                    secondary={pref.description}
                                />
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        defaultChecked={pref.defaultChecked}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index < preferences.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default Preferences; 