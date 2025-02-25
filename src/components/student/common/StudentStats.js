import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Assignment as AssignmentIcon,
    Grade as GradeIcon,
    Event as EventIcon,
    Timeline as TimelineIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, description }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                bgcolor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {icon}
                <Typography 
                    color="textSecondary" 
                    variant="subtitle2" 
                    sx={{ ml: 1 }}
                >
                    {title}
                </Typography>
            </Box>
            <Typography 
                variant="h3" 
                component="div" 
                sx={{ 
                    color: '#1a237e',
                    fontWeight: 500 
                }}
            >
                {value}
            </Typography>
            <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mt: 1 }}
            >
                {description}
            </Typography>
        </Paper>
    </motion.div>
);

const StudentStats = () => {
    const stats = [
        {
            title: "Assignments Due",
            value: "5",
            icon: <AssignmentIcon sx={{ color: '#1a237e' }} />,
            description: "Pending assignments to complete"
        },
        {
            title: "Average Grade",
            value: "A",
            icon: <GradeIcon sx={{ color: '#1a237e' }} />,
            description: "Current academic performance"
        },
        {
            title: "Upcoming Tests",
            value: "2",
            icon: <EventIcon sx={{ color: '#1a237e' }} />,
            description: "Scheduled for next week"
        },
        {
            title: "Attendance",
            value: "95%",
            icon: <TimelineIcon sx={{ color: '#1a237e' }} />,
            description: "Overall attendance rate"
        }
    ];

    return (
        <Grid container spacing={3}>
            {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatCard {...stat} />
                </Grid>
            ))}
        </Grid>
    );
};

export default StudentStats;
