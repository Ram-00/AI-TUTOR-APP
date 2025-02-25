import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const UpcomingDeadlines = () => {
    const deadlines = [
        {
            title: "Mathematics Assignment",
            dueDate: "Tomorrow - 11:59 PM"
        },
        {
            title: "Science Project",
            dueDate: "May 15, 2024 - 5:00 PM"
        },
        {
            title: "English Essay",
            dueDate: "May 20, 2024 - 3:00 PM"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarIcon sx={{ mr: 1, color: '#1a237e' }} />
                    <Typography variant="h6">Upcoming Deadlines</Typography>
                </Box>
                <List>
                    {deadlines.map((deadline, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText 
                                    primary={deadline.title}
                                    secondary={deadline.dueDate}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                />
                            </ListItem>
                            {index < deadlines.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </motion.div>
    );
};

export default UpcomingDeadlines;
