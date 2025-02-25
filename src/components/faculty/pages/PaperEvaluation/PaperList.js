import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    Grid,
    Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PaperList = () => {
    const navigate = useNavigate();

    const papers = [
        {
            id: 1,
            studentName: 'John Doe',
            class: 'Class 10',
            subject: 'Mathematics',
            submittedDate: '2024-03-15 10:30 AM',
            status: 'Pending'
        }
        // Add more paper entries as needed
    ];

    return (
        <Box sx={{ p: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="h3" color="primary">15</Typography>
                            <Typography color="textSecondary">Pending Evaluations</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="h3" color="success.main">8</Typography>
                            <Typography color="textSecondary">Evaluated Today</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="h3" color="info.main">75%</Typography>
                            <Typography color="textSecondary">Average Score</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Search Bar */}
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        placeholder="Search papers..."
                        variant="outlined"
                        sx={{ bgcolor: 'background.paper' }}
                    />
                </Box>

                {/* Papers List */}
                {papers.map((paper) => (
                    <motion.div
                        key={paper.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                mb: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h6">{paper.studentName}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                        <Chip label={paper.class} size="small" />
                                        <Chip label={paper.subject} size="small" color="primary" />
                                        <Chip label={paper.status} size="small" color="warning" />
                                    </Box>
                                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                                        Submitted: {paper.submittedDate}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate(`/faculty-home/paper-evaluation/${paper.id}`)}
                                >
                                    Evaluate
                                </Button>
                            </Box>
                        </Paper>
                    </motion.div>
                ))}
            </motion.div>
        </Box>
    );
};

export default PaperList; 