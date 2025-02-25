import React from 'react';
import { 
    Box, 
    Grid, 
    Paper, 
    Typography, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText,
    Button,
    Divider,
    Card,
    CardContent
} from '@mui/material';
import { 
    ArrowBack, 
    CheckCircle, 
    Timeline, 
    MenuBook,
    TipsAndUpdates,
    FormatQuote
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell
} from 'recharts';

// Comprehensive mock data for all exam types
const resultData = {
    fa1: {
        subjects: [
            {
                name: 'Mathematics',
                score: 85,
                total: 100,
                grade: 'A',
                chapters: [
                    'Quadratic Equations',
                    'Linear Algebra',
                    'Trigonometry',
                    'Statistics'
                ],
                improvements: [
                    'Practice more word problems',
                    'Show complete steps in solutions',
                    'Focus on graph interpretations'
                ],
                guidance: 'Your mathematical concepts are strong. Focus on application-based questions to excel further.'
            },
            {
                name: 'Science',
                score: 92,
                total: 100,
                grade: 'A+',
                chapters: [
                    'Forces and Motion',
                    'Chemical Reactions',
                    'Cell Biology',
                    'Energy Systems'
                ],
                improvements: [
                    'Include more diagrams in answers',
                    'Practice numerical problems',
                    'Focus on experimental analysis'
                ],
                guidance: 'Excellent grasp of scientific concepts. Try solving more complex problems.'
            },
            {
                name: 'English',
                score: 88,
                total: 100,
                grade: 'A',
                chapters: [
                    'Literature Analysis',
                    'Grammar and Composition',
                    'Reading Comprehension',
                    'Creative Writing'
                ],
                improvements: [
                    'Enhance vocabulary usage',
                    'Practice essay writing',
                    'Improve critical analysis'
                ],
                guidance: 'Strong language skills. Focus on advanced writing techniques.'
            }
        ],
        quote: {
            text: "Education is not preparation for life; education is life itself.",
            author: "John Dewey",
            role: "Philosopher and Educator"
        }
    },
    fa2: {
        // Similar structure for FA2 with different data
        subjects: [
            // ... subjects data for FA2
        ],
        quote: {
            text: "The beautiful thing about learning is that no one can take it away from you.",
            author: "B.B. King",
            role: "Musician and Educator"
        }
    },
    self: {
        // Data for self assessment
        subjects: [
            // ... subjects data for self assessment
        ],
        quote: {
            text: "Self-assessment is the first step toward self-improvement.",
            author: "Anonymous",
            role: "Educational Philosophy"
        }
    },
    summative: {
        // Data for summative exam
        subjects: [
            // ... subjects data for summative exam
        ],
        quote: {
            text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
            author: "Pelé",
            role: "Sports Legend"
        }
    }
};

const ExamResultsAnalysis = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const examData = resultData[examId];

    // Enhanced chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    };

    // Transform data for the chart
    const chartData = {
        labels: examData.subjects.map(subject => subject.name),
        datasets: [
            {
                label: 'Score',
                data: examData.subjects.map(subject => subject.score),
                backgroundColor: examData.subjects.map((_, index) => 
                    `hsla(${index * 360 / examData.subjects.length}, 70%, 50%, 0.8)`
                ),
                borderColor: examData.subjects.map((_, index) => 
                    `hsla(${index * 360 / examData.subjects.length}, 70%, 50%, 1)`
                ),
                borderWidth: 1
            }
        ]
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ mb: 4 }}>
                <Button
                    onClick={() => navigate('/student-home/exam-results')}
                    startIcon={<ArrowBack />}
                    sx={{ mb: 2 }}
                >
                    Back to Exam Types
                </Button>

                <Typography variant="h4" gutterBottom color="primary">
                    Performance Analysis
                </Typography>
            </Box>

            {/* Motivational Quote */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 3, 
                        mb: 4, 
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 4
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <FormatQuote sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                "{examData.quote.text}"
                            </Typography>
                            <Typography variant="subtitle2">
                                - {examData.quote.author}, {examData.quote.role}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>

            {/* Enhanced Performance Graph */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Paper 
                    sx={{ 
                        p: 3, 
                        mb: 4, 
                        borderRadius: 4,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                >
                    <Typography variant="h6" gutterBottom color="primary">
                        Subject-wise Performance
                    </Typography>
                    <Box sx={{ height: 400, mt: 2 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={examData.subjects}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip 
                                    formatter={(value) => [`${value}%`, 'Score']}
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: 8,
                                        border: 'none',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Bar 
                                    dataKey="score" 
                                    fill="#1a237e"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1500}
                                >
                                    {examData.subjects.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={`hsla(${index * 360 / examData.subjects.length}, 70%, 50%, 0.8)`}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </motion.div>

            {/* Subject Analysis */}
            <Grid container spacing={3}>
                {examData.subjects.map((subject, index) => (
                    <Grid item xs={12} key={subject.name}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                        >
                            <Paper sx={{ p: 3, borderRadius: 4 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    mb: 3
                                }}>
                                    <Typography variant="h6" color="primary">
                                        {subject.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Typography variant="h6">
                                            {subject.score}/{subject.total}
                                        </Typography>
                                        <Typography 
                                            variant="h6"
                                            sx={{ 
                                                color: 'success.main',
                                                bgcolor: 'success.light',
                                                px: 1,
                                                borderRadius: 1
                                            }}
                                        >
                                            Grade {subject.grade}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    <MenuBook sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                    Chapters Covered
                                                </Typography>
                                                <List dense>
                                                    {subject.chapters.map((chapter, idx) => (
                                                        <ListItem key={idx}>
                                                            <ListItemIcon>
                                                                <CheckCircle color="primary" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={chapter} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                    Areas for Improvement
                                                </Typography>
                                                <List dense>
                                                    {subject.improvements.map((improvement, idx) => (
                                                        <ListItem key={idx}>
                                                            <ListItemIcon>
                                                                <CheckCircle color="error" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={improvement} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    <TipsAndUpdates sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                    Guidance
                                                </Typography>
                                                <Typography variant="body2">
                                                    {subject.guidance}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </motion.div>
    );
};

export default ExamResultsAnalysis; 