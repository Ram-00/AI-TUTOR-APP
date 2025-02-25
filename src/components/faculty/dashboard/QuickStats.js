import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Description as PaperIcon,
    School as ClassIcon,
    Assignment as HomeworkIcon,
    Notifications as NotificationIcon
} from '@mui/icons-material';

const statItems = [
    {
        icon: <PaperIcon sx={{ fontSize: 30, color: '#1976d2' }} />,
        count: '15',
        title: 'Papers Pending',
        subtitle: 'Answer sheets awaiting evaluation',
        iconBg: '#e3f2fd'
    },
    {
        icon: <ClassIcon sx={{ fontSize: 30, color: '#4caf50' }} />,
        count: '4',
        title: 'Upcoming Classes',
        subtitle: 'Classes scheduled for today',
        iconBg: '#e8f5e9'
    },
    {
        icon: <HomeworkIcon sx={{ fontSize: 30, color: '#ff9800' }} />,
        count: '23',
        title: 'Homework to Check',
        subtitle: 'Assignments pending review',
        iconBg: '#fff3e0'
    },
    {
        icon: <NotificationIcon sx={{ fontSize: 30, color: '#9c27b0' }} />,
        count: '7',
        title: 'New Notifications',
        subtitle: 'Unread system notifications',
        iconBg: '#f3e5f5'
    }
];

const QuickStats = () => {
    return (
        <Box>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h5" sx={{ mb: 3, color: '#ff9800' }}>
                    Quick Stats
                </Typography>
            </motion.div>
            <Grid container spacing={3}>
                {statItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={item.title}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Paper
                                component={motion.div}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                sx={{
                                    p: 2.5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    }
                                }}
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: item.iconBg,
                                            mb: 2
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                >
                                    <Typography 
                                        variant="h3" 
                                        component="div" 
                                        gutterBottom
                                        sx={{ 
                                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                            fontWeight: 500 
                                        }}
                                    >
                                        {item.count}
                                    </Typography>
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom
                                        sx={{ 
                                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{ 
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}
                                    >
                                        {item.subtitle}
                                    </Typography>
                                </motion.div>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default QuickStats; 