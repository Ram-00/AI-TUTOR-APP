import React from 'react';
import { 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Chip,
    CardActionArea 
} from '@mui/material';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { Assignment as AssignmentIcon } from '@mui/icons-material';
import PageHeader from '../common/PageHeader';

const SubjectCard = ({ subject }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${subject.color}15, ${subject.color}05)`,
                    border: `1px solid ${subject.color}20`,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: `0 8px 24px ${subject.color}20`
                    }
                }}
            >
                <CardActionArea 
                    onClick={() => navigate(`/student-home/assignments/subject/${subject.id}`)}
                    sx={{ height: '100%', p: 2 }}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <subject.icon 
                                sx={{ 
                                    fontSize: 40, 
                                    color: subject.color,
                                    mr: 2
                                }} 
                            />
                            <Box>
                                <Typography variant="h6" color={subject.color}>
                                    {subject.name}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                    <Chip 
                                        label={`${subject.pendingCount} Pending`}
                                        size="small"
                                        sx={{ 
                                            bgcolor: subject.pendingCount > 0 ? 'error.main' : 'success.main',
                                            color: 'white'
                                        }}
                                    />
                                    <Chip 
                                        label={`${subject.completedCount} Completed`}
                                        size="small"
                                        sx={{ 
                                            bgcolor: 'success.main',
                                            color: 'white'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </motion.div>
    );
};

const Assignments = () => {
    const subjects = [
        {
            id: 'math',
            name: 'Mathematics',
            color: '#1a237e',
            icon: AssignmentIcon,
            assignments: [
                {
                    id: 1,
                    title: 'Quadratic Equations',
                    status: 'Pending',
                    dueDate: 'Tomorrow, 11:59 PM'
                },
                {
                    id: 2,
                    title: 'Linear Algebra',
                    status: 'Submitted',
                    dueDate: '2024-03-20'
                }
            ]
        },
        {
            id: 'science',
            name: 'Science',
            color: '#2e7d32',
            icon: AssignmentIcon,
            assignments: [
                {
                    id: 3,
                    title: 'Renewable Energy',
                    status: 'Pending',
                    dueDate: 'Next Week'
                }
            ]
        },
        // Add more subjects as needed
    ];

    return (
        <Box>
            <PageHeader icon={AssignmentIcon} title="Assignments" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    mb: 4
                }}>
                    <Box sx={{ maxWidth: 200 }}>
                        <Player
                            autoplay
                            loop
                            src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                            style={{ height: '200px', width: '200px' }}
                        />
                    </Box>
                    <Box>
                        <Typography 
                            variant="h5" 
                            gutterBottom
                            sx={{ 
                                color: 'primary.main',
                                fontWeight: 600
                            }}
                        >
                            Subject Assignments
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            View and submit your assignments for each subject
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {subjects.map((subject, index) => (
                        <Grid item xs={12} md={6} key={subject.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <SubjectCard subject={subject} />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Box>
    );
};

export default Assignments;
