import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Quiz as QuestionIcon,
    Assignment as HomeworkIcon,
    AutoStories as LessonIcon
} from '@mui/icons-material';

const activities = [
    {
        icon: <QuestionIcon sx={{ color: '#9c27b0' }} />,
        title: 'Question paper generated',
        subject: 'Mathematics',
        date: '2024-03-15'
    },
    {
        icon: <HomeworkIcon sx={{ color: '#00bcd4' }} />,
        title: 'Homework corrected',
        subject: 'Class 10/Physics',
        date: '2024-03-14'
    },
    {
        icon: <LessonIcon sx={{ color: '#f44336' }} />,
        title: 'Lesson plan created',
        subject: 'Chemistry',
        date: '2024-03-14'
    }
];

const RecentActivity = () => {
    return (
        <Box sx={{ mt: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h5" sx={{ mb: 3, color: '#ff9800' }}>
                    Recent Activity
                </Typography>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Paper 
                    component={motion.div}
                    whileHover={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                    sx={{ p: 2 }}
                >
                    <List>
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            >
                                <ListItem
                                    sx={{
                                        borderBottom: 
                                            index < activities.length - 1 ? '1px solid #eee' : 'none',
                                        py: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                            transform: 'translateX(10px)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <motion.div whileHover={{ scale: 1.2 }}>
                                            {activity.icon}
                                        </motion.div>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={activity.title}
                                        secondary={`${activity.subject} • ${activity.date}`}
                                    />
                                </ListItem>
                            </motion.div>
                        ))}
                    </List>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default RecentActivity; 