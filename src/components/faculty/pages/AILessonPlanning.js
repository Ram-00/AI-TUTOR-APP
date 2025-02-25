import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LightbulbOutlined,
    SaveAlt,
    Edit,
    PlayArrow,
    Quiz,
    LiveHelp,
} from '@mui/icons-material';

const PageWrapper = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    paddingTop: '64px',
}));

const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
    minHeight: 'calc(100vh - 64px)',
}));

const StyledCard = styled(motion(Card))(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
}));

const AILessonPlanning = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [lessonPlan, setLessonPlan] = useState(null);
    const [customNotes, setCustomNotes] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = '#f5f7fa';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleGeneratePlan = () => {
        // Simulate AI generation
        setLessonPlan({
            introduction: {
                approach: 'Start with a real-world example',
                duration: '10 minutes',
                materials: ['Whiteboard', 'Interactive presentation']
            },
            corePoints: [
                'Definition and basic concepts',
                'Key formulas and their applications',
                'Problem-solving techniques'
            ],
            examples: [
                'Real-life application in construction',
                'Mathematical modeling in nature',
                'Daily life calculations'
            ],
            activities: [
                'Group problem-solving exercise',
                'Interactive quiz',
                'Hands-on demonstration'
            ]
        });
    };

    return (
        <PageWrapper>
            <PageContainer>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography 
                        variant="h4" 
                        sx={{
                            background: 'linear-gradient(45deg, #1565C0, #1976D2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 600,
                            mb: 4,
                        }}
                    >
                        AI-Driven Lesson Planning
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Selection Section */}
                        <Grid item xs={12} md={4}>
                            <StyledCard>
                                <SectionTitle variant="h6">
                                    Plan Your Lesson
                                </SectionTitle>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        label="Class"
                                    >
                                        {[6, 7, 8, 9, 10].map((cls) => (
                                            <MenuItem key={cls} value={cls}>
                                                Class {cls}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Subject</InputLabel>
                                    <Select
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        label="Subject"
                                    >
                                        {['Mathematics', 'Science', 'English'].map((sub) => (
                                            <MenuItem key={sub} value={sub}>
                                                {sub}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Topic</InputLabel>
                                    <Select
                                        value={selectedTopic}
                                        onChange={(e) => setSelectedTopic(e.target.value)}
                                        label="Topic"
                                    >
                                        <MenuItem value="topic1">Algebra Basics</MenuItem>
                                        <MenuItem value="topic2">Linear Equations</MenuItem>
                                        <MenuItem value="topic3">Geometry</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleGeneratePlan}
                                    startIcon={<LightbulbOutlined />}
                                >
                                    Generate Lesson Plan
                                </Button>
                            </StyledCard>
                        </Grid>

                        {/* Lesson Plan Section */}
                        <Grid item xs={12} md={8}>
                            <AnimatePresence mode="wait">
                                {lessonPlan && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <StyledCard>
                                            <Box sx={{ mb: 4 }}>
                                                <SectionTitle variant="h6">
                                                    Introduction
                                                </SectionTitle>
                                                <Paper sx={{ p: 2, bgcolor: '#f8fafc' }}>
                                                    <Typography paragraph>
                                                        <strong>Approach:</strong> {lessonPlan.introduction.approach}
                                                    </Typography>
                                                    <Typography paragraph>
                                                        <strong>Duration:</strong> {lessonPlan.introduction.duration}
                                                    </Typography>
                                                    <Typography>
                                                        <strong>Materials needed:</strong>
                                                    </Typography>
                                                    <List dense>
                                                        {lessonPlan.introduction.materials.map((material, index) => (
                                                            <ListItem key={index}>
                                                                <ListItemIcon>
                                                                    <PlayArrow color="primary" />
                                                                </ListItemIcon>
                                                                <ListItemText primary={material} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Paper>
                                            </Box>

                                            <Box sx={{ mb: 4 }}>
                                                <SectionTitle variant="h6">
                                                    Core Teaching Points
                                                </SectionTitle>
                                                <List>
                                                    {lessonPlan.corePoints.map((point, index) => (
                                                        <ListItem key={index}>
                                                            <ListItemIcon>
                                                                <LightbulbOutlined color="primary" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={point} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>

                                            <Box sx={{ mb: 4 }}>
                                                <SectionTitle variant="h6">
                                                    Real-Time Examples
                                                </SectionTitle>
                                                <List>
                                                    {lessonPlan.examples.map((example, index) => (
                                                        <ListItem key={index}>
                                                            <ListItemIcon>
                                                                <LiveHelp color="primary" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={example} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>

                                            <Box sx={{ mb: 4 }}>
                                                <SectionTitle variant="h6">
                                                    Interactive Elements
                                                </SectionTitle>
                                                <List>
                                                    {lessonPlan.activities.map((activity, index) => (
                                                        <ListItem key={index}>
                                                            <ListItemIcon>
                                                                <Quiz color="primary" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={activity} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>

                                            <Divider sx={{ my: 3 }} />

                                            <Box>
                                                <SectionTitle variant="h6">
                                                    Customization Notes
                                                </SectionTitle>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    value={customNotes}
                                                    onChange={(e) => setCustomNotes(e.target.value)}
                                                    placeholder="Add your modifications to the lesson plan..."
                                                />
                                            </Box>

                                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<SaveAlt />}
                                                >
                                                    Save Plan
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Edit />}
                                                >
                                                    Export as DOCX
                                                </Button>
                                            </Box>
                                        </StyledCard>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Grid>
                    </Grid>
                </motion.div>
            </PageContainer>
        </PageWrapper>
    );
};

export default AILessonPlanning; 