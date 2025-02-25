import React from 'react';
import { TextField, Button, Paper } from '@mui/material';

const Feedback = () => {
    return (
        <Paper style={{ padding: '20px', margin: '20px 0' }}>
            <h4>Feedback</h4>
            <TextField
                variant="outlined"
                placeholder="Your feedback..."
                fullWidth
                multiline
                rows={4}
                style={{ marginBottom: '10px' }}
            />
            <Button variant="contained" color="primary">
                Submit
            </Button>
        </Paper>
    );
};

export default Feedback;
