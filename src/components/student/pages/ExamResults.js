import React, { useState } from 'react';
import { 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    CardActionArea,
    Chip,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { Assessment, Timeline, School, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import PageHeader from '../common/PageHeader';
// Replace with your preferred animation from https://lottiefiles.com/
const studyAnimation = {
    "v": "5.7.4",
    "fr": 29.9700012207031,
    "ip": 0,
    "op": 180.00000733155,
    "w": 500,
    "h": 500,
    "nm": "Study",
    "ddd": 0,
    "assets": [],
    "layers": [
        {
            "ddd": 0,
            "ind": 1,
            "ty": 4,
            "nm": "Shape Layer 1",
            "sr": 1,
            "ks": {
                "o": { "a": 0, "k": 100, "ix": 11 },
                "r": { "a": 0, "k": 0, "ix": 10 },
                "p": { "a": 0, "k": [250, 250, 0], "ix": 2, "l": 2 },
                "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 },
                "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 }
            },
            "ao": 0,
            "shapes": [
                {
                    "ty": "gr",
                    "it": [
                        {
                            "d": 1,
                            "ty": "el",
                            "s": { "a": 0, "k": [100, 100], "ix": 2 },
                            "p": { "a": 0, "k": [0, 0], "ix": 3 },
                            "nm": "Ellipse Path 1",
                            "mn": "ADBE Vector Shape - Ellipse",
                            "hd": false
                        },
                        {
                            "ty": "st",
                            "c": { "a": 0, "k": [0.1, 0.1, 0.9, 1], "ix": 3 },
                            "o": { "a": 0, "k": 100, "ix": 4 },
                            "w": { "a": 0, "k": 4, "ix": 5 },
                            "lc": 1,
                            "lj": 1,
                            "ml": 4,
                            "bm": 0,
                            "nm": "Stroke 1",
                            "mn": "ADBE Vector Graphic - Stroke",
                            "hd": false
                        }
                    ],
                    "np": 2,
                    "cix": 2,
                    "bm": 0,
                    "ix": 1,
                    "mn": "ADBE Vector Group",
                    "hd": false
                }
            ],
            "ip": 0,
            "op": 180.00000733155,
            "st": 0,
            "bm": 0
        }
    ]
};

const ExamTypes = [
    {
        id: 'fa1',
        title: 'Formative Assessment 1',
        icon: Assessment,
        color: '#2196f3',
        description: 'First term continuous assessment',
        period: 'July - August'
    },
    {
        id: 'fa2',
        title: 'Formative Assessment 2',
        icon: Timeline,
        color: '#4caf50',
        description: 'Second term continuous assessment',
        period: 'September - October'
    },
    {
        id: 'self',
        title: 'Self Assessment',
        icon: School,
        color: '#ff9800',
        description: 'Practice tests and evaluations',
        period: 'Ongoing'
    },
    {
        id: 'summative',
        title: 'Summative Exam',
        icon: Assignment,
        color: '#9c27b0',
        description: 'Final comprehensive assessment',
        period: 'November - December'
    }
];

const ExamTypeCard = ({ examType, onSelect }) => {
    const theme = useTheme();
    
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${examType.color}15, ${examType.color}05)`,
                    border: `1px solid ${examType.color}30`,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: `0 8px 24px ${examType.color}20`
                    }
                }}
            >
                <CardActionArea 
                    onClick={() => onSelect(examType.id)}
                    sx={{ height: '100%', p: 2 }}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <examType.icon 
                                sx={{ 
                                    fontSize: 40, 
                                    color: examType.color,
                                    mr: 2
                                }} 
                            />
                            <Box>
                                <Typography variant="h6" color={examType.color}>
                                    {examType.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {examType.description}
                                </Typography>
                            </Box>
                        </Box>
                        <Chip 
                            label={examType.period}
                            size="small"
                            sx={{ 
                                bgcolor: `${examType.color}20`,
                                color: examType.color,
                                fontWeight: 500
                            }}
                        />
                    </CardContent>
                </CardActionArea>
            </Card>
        </motion.div>
    );
};

const ExamResults = () => {
    const navigate = useNavigate();

    const handleExamSelect = (examId) => {
        navigate(`/student-home/exam-results/${examId}`);
    };

    return (
        <Box>
            <PageHeader icon={Assessment} title="Exam Results" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: '-20px' }}
            >
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: 4,
                    mt: 0
                }}>
                    <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                            color: 'primary.main',
                            fontWeight: 600
                        }}
                    >
                        Track Your Academic Journey
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Select an assessment type to view detailed performance analysis
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {ExamTypes.map((examType) => (
                        <Grid item xs={12} md={6} key={examType.id}>
                            <ExamTypeCard 
                                examType={examType} 
                                onSelect={handleExamSelect}
                            />
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Box>
    );
};

export default ExamResults;
