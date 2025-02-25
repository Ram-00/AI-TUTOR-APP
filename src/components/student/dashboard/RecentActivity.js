import React from 'react';
import { Paper, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Assignment as AssignmentIcon,
    Book as BookIcon,
    Grade as GradeIcon
} from '@mui/icons-material';

const RecentActivity = () => {
    const activities = [
        {
            icon: <AssignmentIcon sx={{ color: '#1a237e' }} />,
            title: 'Assignment submitted',
            details: 'Mathematics • 2024-03-15',
        },
        {
            icon: <GradeIcon sx={{ color: '#1a237e' }} />,
            title: 'Test result published',
            details: 'Physics • 2024-03-14',
        },
        {
            icon: <BookIcon sx={{ color: '#1a237e' }} />,
            title: 'Study material accessed',
            details: 'Chemistry • 2024-03-14',
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Paper 
                elevation={0}
                sx={{ 
                    borderRadius: 2,
                    bgcolor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                <List>
                    {activities.map((activity, index) => (
                        <ListItem 
                            key={index}
                            sx={{
                                py: 2,
                                borderBottom: 
                                    index < activities.length - 1 
                                        ? '1px solid rgba(0, 0, 0, 0.08)' 
                                        : 'none',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.02)'
                                }
                            }}
                        >
                            <ListItemIcon>
                                {activity.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" sx={{ color: '#1a237e', fontWeight: 500 }}>
                                        {activity.title}
                                    </Typography>
                                }
                                secondary={activity.details}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </motion.div>
    );
};

export default RecentActivity; 