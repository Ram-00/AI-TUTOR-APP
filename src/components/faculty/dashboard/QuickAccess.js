import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Dashboard as DashboardIcon,
    Assignment as PaperIcon,
    Quiz as QuestionIcon,
    MenuBook as SynopsisIcon,
    Grade as HomeworkIcon,
    AutoStories as LessonIcon
} from '@mui/icons-material';

const quickAccessItems = [
    {
        icon: <DashboardIcon sx={{ fontSize: 30, color: '#1976d2' }} />,
        title: 'Dashboard',
        description: 'Access dashboard features and tools',
        path: '/faculty-home',
        iconBg: '#e3f2fd'
    },
    {
        icon: <PaperIcon sx={{ fontSize: 30, color: '#ff9800' }} />,
        title: 'Paper Evaluation',
        description: 'Access paper evaluation features and tools',
        path: '/faculty-home/paper-evaluation',
        iconBg: '#fff3e0'
    },
    {
        icon: <QuestionIcon sx={{ fontSize: 30, color: '#9c27b0' }} />,
        title: 'Question Paper Generation',
        description: 'Access question paper generation features and tools',
        path: '/faculty-home/question-generation',
        iconBg: '#f3e5f5'
    },
    {
        icon: <SynopsisIcon sx={{ fontSize: 30, color: '#4caf50' }} />,
        title: 'Synopsis for Teachers',
        description: 'Access synopsis for teachers features and tools',
        path: '/faculty-home/synopsis',
        iconBg: '#e8f5e9'
    },
    {
        icon: <HomeworkIcon sx={{ fontSize: 30, color: '#f44336' }} />,
        title: 'Homework Correction',
        description: 'Access homework correction features and tools',
        path: '/faculty-home/homework',
        iconBg: '#ffebee'
    },
    {
        icon: <LessonIcon sx={{ fontSize: 30, color: '#2196f3' }} />,
        title: 'AI-Driven Lesson Planning',
        description: 'Access ai-driven lesson planning features and tools',
        path: '/faculty-home/lesson-planning',
        iconBg: '#e3f2fd'
    }
];

const QuickAccess = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h5" sx={{ mb: 3, color: '#ff9800' }}>
                    Quick Access
                </Typography>
            </motion.div>
            <Grid container spacing={3}>
                {quickAccessItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.title}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Paper
                                component={motion.div}
                                whileHover={{ 
                                    scale: 1.03,
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    borderRadius: 3,
                                    overflow: 'hidden'
                                }}
                                onClick={() => navigate(item.path)}
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
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
                                <Typography variant="h6" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default QuickAccess; 