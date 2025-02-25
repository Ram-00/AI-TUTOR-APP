import React from 'react';
import { Typography, List, ListItem } from '@mui/material';

const MyAssignments = () => {
    return (
        <div>
            <Typography variant="h4">My Assignments</Typography>
            <List>
                <ListItem>Math Homework - Due: 2023-10-10</ListItem>
                <ListItem>Science Project - Due: 2023-10-15</ListItem>
                {/* Add more assignments as needed */}
            </List>
        </div>
    );
};

export default MyAssignments;
