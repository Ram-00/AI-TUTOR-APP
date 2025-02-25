import React from 'react';
import { Typography, List, ListItem } from '@mui/material';

const ExamResults = () => {
    return (
        <div>
            <Typography variant="h4">Exam Results</Typography>
            <List>
                <ListItem>Math Exam: 85%</ListItem>
                <ListItem>Science Exam: 90%</ListItem>
                {/* Add more results as needed */}
            </List>
        </div>
    );
};

export default ExamResults;
