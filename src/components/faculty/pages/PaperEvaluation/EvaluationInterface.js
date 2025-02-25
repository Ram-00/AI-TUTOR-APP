import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Slider,
    IconButton,
    Tooltip,
    Chip
} from '@mui/material';
import {
    ArrowBack,
    Draw,
    Comment,
    PanTool,
    Grade,
    Undo,
    Redo,
    CheckCircle,
    Save
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page } from 'react-pdf';
import { Player } from '@lottiefiles/react-lottie-player';

const EvaluationInterface = ({ studentName, className, subject }) => {
    const [currentTool, setCurrentTool] = useState('pan');
    const [marks, setMarks] = useState(0);
    const [comments, setComments] = useState('');

    const tools = [
        { name: 'pan', icon: PanTool, tooltip: 'Pan Tool' },
        { name: 'draw', icon: Draw, tooltip: 'Draw/Annotate' },
        { name: 'comment', icon: Comment, tooltip: 'Add Comment' },
        { name: 'grade', icon: Grade, tooltip: 'Grade' }
    ];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton 
                                onClick={() => window.history.back()}
                                sx={{ 
                                    border: '1px solid rgba(33, 150, 243, 0.2)',
                                    '&:hover': { borderColor: 'primary.main' }
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        </motion.div>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                            Paper Evaluation - {studentName}
                        </Typography>
                        <Chip 
                            label={className} 
                            sx={{ 
                                background: 'linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)',
                                color: '#1976d2',
                                border: '1px solid rgba(25, 118, 210, 0.2)'
                            }} 
                        />
                        <Chip 
                            label={subject} 
                            sx={{ 
                                background: 'linear-gradient(45deg, #e8f5e9 30%, #c8e6c9 90%)',
                                color: '#2e7d32',
                                border: '1px solid rgba(46, 125, 50, 0.2)'
                            }} 
                        />
                    </Box>

                    <Grid container spacing={3}>
                        {/* PDF Viewer */}
                        <Grid item xs={12} md={8}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border: '1px solid rgba(33, 150, 243, 0.2)',
                                    borderRadius: 2,
                                    height: 'calc(100vh - 200px)',
                                    overflow: 'auto',
                                    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                {/* Tools */}
                                <Box sx={{ mb: 2, display: 'flex', gap: 1, p: 1, borderBottom: '1px solid rgba(33, 150, 243, 0.2)' }}>
                                    {tools.map((tool) => (
                                        <motion.div
                                            key={tool.name}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Tooltip title={tool.tooltip}>
                                                <IconButton
                                                    color={currentTool === tool.name ? 'primary' : 'default'}
                                                    onClick={() => setCurrentTool(tool.name)}
                                                    sx={{ 
                                                        border: '1px solid',
                                                        borderColor: currentTool === tool.name ? 'primary.main' : 'rgba(33, 150, 243, 0.2)'
                                                    }}
                                                >
                                                    <tool.icon />
                                                </IconButton>
                                            </Tooltip>
                                        </motion.div>
                                    ))}
                                </Box>

                                {/* PDF Viewer */}
                                <Document file="path_to_pdf">
                                    <Page pageNumber={1} />
                                </Document>
                            </Paper>
                        </Grid>

                        {/* Evaluation Panel */}
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: '1px solid rgba(33, 150, 243, 0.2)',
                                    borderRadius: 2,
                                    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                                    Evaluation Details
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <Typography gutterBottom>Marks</Typography>
                                    <Slider
                                        value={marks}
                                        onChange={(e, newValue) => setMarks(newValue)}
                                        max={100}
                                        valueLabelDisplay="auto"
                                        sx={{
                                            '& .MuiSlider-thumb': {
                                                border: '2px solid',
                                                borderColor: 'primary.main'
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Comments"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                border: '1px solid rgba(33, 150, 243, 0.2)',
                                                '&:hover': {
                                                    borderColor: 'primary.main'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<CheckCircle />}
                                        sx={{
                                            background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                            border: '1px solid rgba(33, 150, 243, 0.3)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)'
                                            }
                                        }}
                                    >
                                        Submit Evaluation
                                    </Button>
                                </motion.div>

                                {/* Success Animation */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                    <Player
                                        autoplay
                                        loop
                                        src="https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
};

export default EvaluationInterface; 