import React from 'react';
import { Grid, Typography, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Assignment as AssignmentIcon,
    Assessment as ResultsIcon,
    LibraryBooks as ResourcesIcon,
} from '@mui/icons-material';

const QuickAccessCard = ({ icon, title, path, description }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card 
                sx={{ 
                    height: '100%',
                    bgcolor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    transition: 'all 0.3s ease'
                }}
            >
                <CardActionArea 
                    onClick={() => navigate(path)}
                    sx={{ height: '100%', p: 3 }}
                >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            color: '#1a237e'
                        }}>
                            {icon}
                            <Typography variant="h6" color="inherit">
                                {title}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </motion.div>
    );
};

const QuickAccess = () => {
    const quickAccessItems = [
        {
            icon: <AssignmentIcon fontSize="large" />,
            title: "My Assignments",
            path: "/student-home/assignments",
            description: "Access assignment features and tools"
        },
        {
            icon: <ResultsIcon fontSize="large" />,
            title: "Exam Results",
            path: "/student-home/exam-results",
            description: "View exam results and performance"
        },
        {
            icon: <ResourcesIcon fontSize="large" />,
            title: "Study Materials",
            path: "/student-home/learning-resources",
            description: "Access learning resources and materials"
        }
    ];

    return (
        <Box sx={{ mt: 4 }}>
            <Typography 
                variant="h6" 
                sx={{ 
                    mb: 3, 
                    color: '#1a237e',
                    fontWeight: 500 
                }}
            >
                Quick Access
            </Typography>
            <Grid container spacing={3}>
                {quickAccessItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <QuickAccessCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default QuickAccess; 