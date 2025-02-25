import React from 'react';
import { 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { 
    Assessment, 
    Assignment, 
    MenuBook,
    Timeline,
    CalendarToday,
    Announcement,
    NavigateNext,
    Description,
    Support,
    Info
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../common/PageHeader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for performance graph
const performanceData = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 92 },
    { month: 'Apr', score: 90 },
    { month: 'May', score: 95 }
];

// Mock data for upcoming deadlines
const upcomingDeadlines = [
    {
        id: 1,
        title: 'Mathematics Assignment',
        date: '2024-03-20',
        type: 'assignment'
    },
    {
        id: 2,
        title: 'Science Test',
        date: '2024-03-22',
        type: 'test'
    },
    {
        id: 3,
        title: 'English Project',
        date: '2024-03-25',
        type: 'project'
    }
];

// Mock data for announcements
const announcements = [
    {
        id: 1,
        title: 'Parent-Teacher Meeting',
        date: '2024-03-18',
        content: 'Scheduled for next week'
    },
    {
        id: 2,
        title: 'Sports Day',
        date: '2024-03-24',
        content: 'Annual sports meet'
    }
];

const QuickAccessCard = ({ title, icon: Icon, color, path, animationUrl }) => {
    const navigate = useNavigate();
    
    // Special icon handling for Study Materials
    const iconMap = {
        'Study Materials': MenuBook,
        'My Assignments': Assignment,
        'Exam Results': Assessment
    };

    const IconComponent = iconMap[title] || Icon;

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card 
                onClick={() => navigate(path)}
                sx={{ 
                    cursor: 'pointer',
                    background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                    border: `1px solid ${color}20`,
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                        boxShadow: `0 8px 24px ${color}20`
                    }
                }}
            >
                <CardContent sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 3
                }}>
                    <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <IconComponent sx={{ 
                            fontSize: 24,
                            color: color
                        }} />
                        <Typography variant="h6" color={color}>
                            {title}
                        </Typography>
                    </Box>
                    <NavigateNext sx={{ ml: 'auto', color }} />
                </CardContent>
            </Card>
        </motion.div>
    );
};

const StudentDashboard = () => {
    return (
        <Box>
            <PageHeader icon={Timeline} title="Dashboard" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Performance Graph */}
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 3, 
                        mb: 3,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)'
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                        Academic Performance
                    </Typography>
                    <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="month" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip 
                                    contentStyle={{ 
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        border: 'none',
                                        borderRadius: 8,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                    dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    {/* Upcoming Deadlines */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Paper 
                                elevation={0}
                                sx={{ 
                                    p: 3, 
                                    height: '100%',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box sx={{ position: 'absolute', right: 10, top: 10, width: 60, height: 60 }}>
                                    <Player
                                        autoplay
                                        loop
                                        src="https://assets9.lottiefiles.com/packages/lf20_5tkzkblw.json"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </Box>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Upcoming Deadlines
                                </Typography>
                                <List>
                                    {upcomingDeadlines.map((deadline, index) => (
                                        <motion.div
                                            key={deadline.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CalendarToday color="primary" />
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary={deadline.title}
                                                    secondary={new Date(deadline.date).toLocaleDateString()}
                                                    primaryTypographyProps={{
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </ListItem>
                                        </motion.div>
                                    ))}
                                </List>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Announcements */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Paper 
                                elevation={0}
                                sx={{ 
                                    p: 3, 
                                    height: '100%',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box sx={{ position: 'absolute', right: 10, top: 10, width: 60, height: 60 }}>
                                    <Player
                                        autoplay
                                        loop
                                        src="https://assets3.lottiefiles.com/packages/lf20_xyadoh9h.json"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </Box>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Announcements & News
                                </Typography>
                                <List>
                                    {announcements.map((announcement, index) => (
                                        <motion.div
                                            key={announcement.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Announcement color="primary" />
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary={announcement.title}
                                                    secondary={announcement.content}
                                                    primaryTypographyProps={{
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </ListItem>
                                        </motion.div>
                                    ))}
                                </List>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Quick Access Tiles */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Quick Access
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <QuickAccessCard 
                                    title="My Assignments"
                                    color="#2196f3"
                                    path="/student-home/assignments"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <QuickAccessCard 
                                    title="Exam Results"
                                    color="#4caf50"
                                    path="/student-home/exam-results"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <QuickAccessCard 
                                    title="Study Materials"
                                    color="#ff9800"
                                    path="/student-home/learning-resources"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Footer */}
                <Box 
                    component="footer" 
                    sx={{ 
                        mt: 4, 
                        pt: 2, 
                        borderTop: 1, 
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button 
                            startIcon={<Description />}
                            size="small"
                            color="primary"
                            variant="text"
                        >
                            Academic Policies
                        </Button>
                        <Button 
                            startIcon={<Support />}
                            size="small"
                            color="primary"
                            variant="text"
                        >
                            Contact Support
                        </Button>
                        <Button 
                            startIcon={<Info />}
                            size="small"
                            color="primary"
                            variant="text"
                        >
                            Version 1.0.0
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};

export default StudentDashboard;
