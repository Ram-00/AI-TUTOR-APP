import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Slider,
    Divider,
    Chip,
    IconButton,
    Tooltip,
    InputBase
} from '@mui/material';
import {
    Save,
    ArrowBack,
    Add,
    Comment,
    Undo,
    Redo,
    Draw,
    PanTool,
    Grade,
    CheckCircle,
    Search as SearchIcon,
    FilterList
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { Player } from '@lottiefiles/react-lottie-player';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PaperEvaluation = () => {
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [marks, setMarks] = useState(0);
    const [comments, setComments] = useState('');

    const papers = [
        {
            id: 1,
            studentName: 'John Doe',
            class: 'Class 10',
            subject: 'Mathematics',
            submittedDate: '2024-03-15 10:30 AM',
            status: 'Pending'
        }
        // Add more papers as needed
    ];

    // Enhanced animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30
            }
        }
    };

    const statsCardStyle = {
        p: 3,
        height: '100%',
        textAlign: 'center',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: '2px solid rgba(33, 150, 243, 0.2)',
        boxShadow: '1px 8px 32px rgba(31, 38, 135, 0.15)',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(31, 38, 135, 0.25)',
            borderColor: 'primary.main',
            '& .stat-number': {
                color: 'primary.main',
                transform: 'scale(1.1)',
            }
        }
    };

    const renderPapersList = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="papers-list-container"
        >
            {/* Stats Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                    {
                        title: 'Pending Evaluations',
                        value: '15',
                        color: '#2196f3',
                        animation: 'https://assets8.lottiefiles.com/packages/lf20_xyadoh9h.json'
                    },
                    {
                        title: 'Evaluated Today',
                        value: '15',
                        color: '#4caf50',
                        animation: 'https://assets9.lottiefiles.com/packages/lf20_yom6uvgj.json'
                    },
                    {
                        title: 'Average Score',
                        value: '15',
                        color: '#ff9800',
                        animation: 'https://assets2.lottiefiles.com/packages/lf20_qm8eqhqh.json'
                    }
                ].map((stat, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <motion.div variants={cardVariants}>
                            <Paper sx={statsCardStyle}>
                                <Box sx={{ position: 'relative', zIndex: 1 }}>
                                    <Typography 
                                        variant="h2" 
                                        className="stat-number"
                                        sx={{ 
                                            color: stat.color,
                                            transition: 'all 0.3s ease',
                                            fontWeight: 600
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={{ 
                                            color: 'text.secondary',
                                            mt: 1
                                        }}
                                    >
                                        {stat.title}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -20,
                                        right: -20,
                                        width: 100,
                                        height: 100,
                                        opacity: 0.1,
                                        transform: 'rotate(-5deg)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Player
                                        autoplay
                                        loop
                                        src={stat.animation}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Search Bar */}
            <motion.div variants={cardVariants}>
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        '&:hover': {
                            boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <SearchIcon sx={{ color: 'primary.main', mx: 1 }} />
                    </motion.div>
                    <InputBase
                        fullWidth
                        placeholder="Search papers..."
                        sx={{ ml: 1 }}
                    />
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button 
                            variant="contained"
                            sx={{
                                ml: 2,
                                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
                            }}
                        >
                            FILTER
                        </Button>
                    </motion.div>
                </Paper>
            </motion.div>

            {/* Papers List */}
            {papers.map((paper, index) => (
                <motion.div
                    key={paper.id}
                    variants={cardVariants}
                    custom={index}
                >
                    <Paper
                        sx={{
                            p: 3,
                            mb: 2,
                            borderRadius: 2,
                            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateX(10px)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                borderLeft: '4px solid #2196f3'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {paper.studentName}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                    <Chip 
                                        label={paper.class}
                                        size="small"
                                        sx={{ 
                                            background: 'linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)',
                                            color: '#1976d2'
                                        }}
                                    />
                                    <Chip 
                                        label={paper.subject}
                                        size="small"
                                        sx={{ 
                                            background: 'linear-gradient(45deg, #e8f5e9 30%, #c8e6c9 90%)',
                                            color: '#2e7d32'
                                        }}
                                    />
                                    <Chip 
                                        label="Pending"
                                        size="small"
                                        sx={{ 
                                            background: 'linear-gradient(45deg, #fff3e0 30%, #ffe0b2 90%)',
                                            color: '#f57c00'
                                        }}
                                    />
                                </Box>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        display: 'block',
                                        mt: 1,
                                        color: 'text.secondary'
                                    }}
                                >
                                    Submitted: {paper.submittedDate}
                                </Typography>
                            </Box>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setSelectedPaper(paper);
                                        setIsEvaluating(true);
                                    }}
                                    sx={{
                                        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)'
                                        }
                                    }}
                                >
                                    EVALUATE
                                </Button>
                            </motion.div>
                        </Box>
                    </Paper>
                </motion.div>
            ))}
        </motion.div>
    );

    const renderEvaluationInterface = () => (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <IconButton onClick={() => setIsEvaluating(false)}>
                            <ArrowBack />
                        </IconButton>
                    </motion.div>
                    <Typography variant="h5" color="primary">
                        Paper Evaluation - {selectedPaper?.studentName}
                    </Typography>
                    <Chip label={selectedPaper?.class} color="primary" />
                    <Chip label={selectedPaper?.subject} color="secondary" />
                </Box>

                <Grid container spacing={3}>
                    {/* PDF Viewer */}
                    <Grid item xs={12} md={8}>
                        <Paper 
                            elevation={0}
                            sx={{ 
                                p: 2, 
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                height: 'calc(100vh - 200px)',
                                overflow: 'auto'
                            }}
                        >
                            {/* Evaluation Tools */}
                            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                                <Tooltip title="Pan Tool">
                                    <IconButton>
                                        <PanTool />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Draw">
                                    <IconButton>
                                        <Draw />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Comment">
                                    <IconButton>
                                        <Comment />
                                    </IconButton>
                                </Tooltip>
                                <Divider orientation="vertical" flexItem />
                                <Tooltip title="Undo">
                                    <IconButton>
                                        <Undo />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Redo">
                                    <IconButton>
                                        <Redo />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            {/* PDF Viewer Component */}
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
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Evaluation Details
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography gutterBottom>Marks</Typography>
                                <Slider
                                    value={marks}
                                    onChange={(e, newValue) => setMarks(newValue)}
                                    max={100}
                                    valueLabelDisplay="auto"
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
                                />
                            </Box>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            <CheckCircle />
                                        </motion.div>
                                    }
                                    onClick={() => {
                                        // Handle submission
                                        setIsEvaluating(false);
                                    }}
                                    sx={{
                                        background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)'
                                    }}
                                >
                                    Submit Evaluation
                                </Button>
                            </motion.div>

                            {/* Success animation */}
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
            </motion.div>
        </AnimatePresence>
    );

    return isEvaluating ? renderEvaluationInterface() : renderPapersList();
};

export default PaperEvaluation; 