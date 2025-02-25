import React from 'react';
import { Paper, TextField, Button } from '@mui/material';

const Chatbot = () => {
    return (
        <Paper style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px' }}>
            <h4>AI Assistant</h4>
            <TextField placeholder="Ask me..." fullWidth />
            <Button variant="contained" color="primary">Send</Button>
        </Paper>
    );
};

export default Chatbot;
