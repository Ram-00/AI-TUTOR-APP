import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Notifications as NotificationIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Announcements = () => {
    const announcements = [
        {
            title: "Parent-Teacher Meeting",
            description: "Scheduled for next Friday. All parents are requested to attend."
        },
        {
            title: "Annual Sports Day",
            description: "Registration starts next week. Multiple sports events available."
        },
        {
            title: "Science Fair",
            description: "Upcoming science fair next month. Start preparing your projects."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <NotificationIcon sx={{ mr: 1, color: '#1a237e' }} />
                    <Typography variant="h6">Announcements & News</Typography>
                </Box>
                <List>
                    {announcements.map((announcement, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText 
                                    primary={announcement.title}
                                    secondary={announcement.description}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                />
                            </ListItem>
                            {index < announcements.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </motion.div>
    );
};

export default Announcements;
