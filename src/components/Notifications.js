import React from 'react';
import { Paper, Typography } from '@mui/material';

const Notifications = () => {
    return (
        <Paper style={{ padding: '20px' }}>
            <h4>Notifications</h4>
            <Typography variant="body1">You have no new notifications.</Typography>
        </Paper>
    );
};

export default Notifications;
