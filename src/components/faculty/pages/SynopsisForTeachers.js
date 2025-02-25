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
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download,
    Save,
} from '@mui/icons-material';

const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: '#f5f7fa',
    minHeight: 'calc(100vh - 64px)', // Subtract header height
    marginTop: '64px', // Account for header
}));

const SelectionPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));

const ContentPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: '100%',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 600,
    padding: theme.spacing(1, 3),
}));

const SynopsisForTeachers = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('');
    const [personalNotes, setPersonalNotes] = useState('');
    const [lessonSummary, setLessonSummary] = useState(null);

    useEffect(() => {
        document.body.style.backgroundColor = '#f5f7fa';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleGenerateSynopsis = () => {
        // Simulate AI generation
        setLessonSummary({
            keyTopics: [
                'Introduction to Algebra',
                'Linear Equations',
                'Solving Word Problems'
            ],
            importantQuestions: [
                'What is a variable?',
                'How to solve linear equations?',
                'Real-world applications of algebra'
            ],
            teachingApproach: [
                'Start with simple examples',
                'Use visual representations',
                'Practice with interactive exercises'
            ]
        });
    };

    return (
        <PageContainer>
            <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 600, mb: 3 }}>
                Synopsis for Teachers
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                Access comprehensive teaching resources and AI-powered assistance
            </Typography>

            <Grid container spacing={4}>
                {/* Left Panel - Selection Controls */}
                <Grid item xs={12} md={4}>
                    <SelectionPanel>
                        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                            Select Lesson
                        </Typography>
                        
                        <StyledFormControl>
                            <InputLabel>Class</InputLabel>
                            <Select
                                value={selectedClass}
                                label="Class"
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <MenuItem value="6">Class 6</MenuItem>
                                <MenuItem value="7">Class 7</MenuItem>
                                <MenuItem value="8">Class 8</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <StyledFormControl>
                            <InputLabel>Subject</InputLabel>
                            <Select
                                value={selectedSubject}
                                label="Subject"
                                onChange={(e) => setSelectedSubject(e.target.value)}
                            >
                                <MenuItem value="mathematics">Mathematics</MenuItem>
                                <MenuItem value="science">Science</MenuItem>
                                <MenuItem value="english">English</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <StyledFormControl>
                            <InputLabel>Lesson</InputLabel>
                            <Select
                                value={selectedLesson}
                                label="Lesson"
                                onChange={(e) => setSelectedLesson(e.target.value)}
                            >
                                <MenuItem value="chapter1">Chapter 1: Introduction</MenuItem>
                                <MenuItem value="chapter2">Chapter 2: Basic Concepts</MenuItem>
                                <MenuItem value="chapter3">Chapter 3: Advanced Topics</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <StyledButton
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleGenerateSynopsis}
                        >
                            Generate Synopsis
                        </StyledButton>
                    </SelectionPanel>
                </Grid>

                {/* Right Panel - Content Display */}
                <Grid item xs={12} md={8}>
                    <ContentPanel>
                        <AnimatePresence mode="wait">
                            {lessonSummary && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Key Topics
                                        </Typography>
                                        <List>
                                            {lessonSummary.keyTopics.map((topic, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={`• ${topic}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>

                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Important Questions
                                        </Typography>
                                        <List>
                                            {lessonSummary.importantQuestions.map((question, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={`${index + 1}. ${question}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>

                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Suggested Teaching Approach
                                        </Typography>
                                        <List>
                                            {lessonSummary.teachingApproach.map((approach, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={`• ${approach}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>

                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Personal Notes
                                        </Typography>
                                        <TextField
                                            multiline
                                            rows={4}
                                            fullWidth
                                            placeholder="Add your personal notes here..."
                                            variant="outlined"
                                            value={personalNotes}
                                            onChange={(e) => setPersonalNotes(e.target.value)}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                        <StyledButton
                                            variant="outlined"
                                            startIcon={<Save />}
                                        >
                                            Save
                                        </StyledButton>
                                        <StyledButton
                                            variant="contained"
                                            startIcon={<Download />}
                                        >
                                            Download PDF
                                        </StyledButton>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </ContentPanel>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default SynopsisForTeachers; 